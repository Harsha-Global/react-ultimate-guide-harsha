// Supplied local course service. Backend implementation is deferred to the full-stack block.
import { randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { loginSchema, registrationSchema } from "../shared/authSchema.ts";
const derive = promisify(scrypt);
const origins = new Set(["http://localhost:5185", "http://127.0.0.1:5185"]);
const cookieName = "shopfront_session";
const ttl = 15 * 60 * 1000;
const sessions = new Map();
const users = [];
const attempts = new Map();
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const safeUser = ({ id, name, email, role }) => ({ id, name, email, role });
async function passwordHash(password, salt) {
    return derive(password, salt, 64, {
        N: 32768,
        r: 8,
        p: 3,
        maxmem: 128 * 1024 * 1024,
    });
}
async function makeUser(name, email, role, password) {
    const salt = randomBytes(16);
    return {
        id: randomUUID(),
        name,
        email,
        role,
        salt,
        hash: await passwordHash(password, salt),
    };
}
users.push(await makeUser("Jordan Parker", "jordan@example.com", "member", "PracticeOnly42!"));
users.push(await makeUser("Rebecca Stone", "rebecca@example.com", "admin", "PracticeOnly42!"));
const dummySalt = randomBytes(16);
function send(res, status, value) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
    });
    res.end(JSON.stringify(value));
}
function reject(res, status, message, code = "REQUEST_FAILED", fields = {}) {
    send(res, status, { message, code, fields });
}
function currentSession(req) {
    const id = req.headers.cookie
        ?.split(";")
        .map((x) => x.trim())
        .find((x) => x.startsWith(cookieName + "="))
        ?.slice(cookieName.length + 1);
    const s = sessions.get(id);
    if (s && s.expiresAt > Date.now())
        return { id, ...s };
    if (id)
        sessions.delete(id);
    return null;
}
function createSession(res, userId = null, previousId) {
    if (previousId)
        sessions.delete(previousId);
    const id = randomBytes(32).toString("hex");
    const s = {
        userId,
        csrfToken: randomBytes(32).toString("hex"),
        expiresAt: Date.now() + ttl,
    };
    sessions.set(id, s);
    res.setHeader("Set-Cookie", `${cookieName}=${id}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${ttl / 1000}`);
    return { id, ...s };
}
function sessionResult(s) {
    return {
        user: s.userId ? safeUser(users.find((u) => u.id === s.userId)) : null,
        csrfToken: s.csrfToken,
    };
}
function authUser(req, res) {
    const s = currentSession(req);
    const u = s && users.find((u) => u.id === s.userId);
    if (!u) {
        reject(res, 401, "Your session has ended. Sign in again.", "SESSION_EXPIRED");
        return null;
    }
    return u;
}
function allowedWrite(req, res, s) {
    if (!origins.has(req.headers.origin)) {
        reject(res, 403, "This request origin is not allowed.", "ORIGIN");
        return false;
    }
    const token = req.headers["x-csrf-token"];
    if (!s ||
        typeof token !== "string" ||
        !/^[a-f0-9]{64}$/.test(token) ||
        !timingSafeEqual(Buffer.from(token), Buffer.from(s.csrfToken))) {
        reject(res, 403, "Refresh the session and try again.", "CSRF");
        return false;
    }
    return true;
}
async function readBody(req) {
    if (req.headers["content-type"]?.split(";")[0] !== "application/json")
        throw Object.assign(new Error("Send application/json."), { status: 415 });
    let value = "";
    for await (const part of req) {
        value += part;
        if (Buffer.byteLength(value) > 8192)
            throw Object.assign(new Error("Request is too large."), { status: 413 });
    }
    try {
        return JSON.parse(value);
    }
    catch {
        throw Object.assign(new Error("Send valid JSON."), { status: 400 });
    }
}
function validate(schema, value, res) {
    const checked = schema.safeParse(value);
    if (checked.success)
        return checked.data;
    const fields = {};
    for (const issue of checked.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fields[key])
            fields[key] = issue.message;
    }
    reject(res, 422, "Check the highlighted fields.", "VALIDATION", fields);
    return null;
}
function rateLimit(req, res) {
    const key = req.socket.remoteAddress;
    let item = attempts.get(key);
    if (!item || Date.now() - item.start > 60000) {
        item = { start: Date.now(), count: 0 };
        attempts.set(key, item);
    }
    if (++item.count > 20) {
        res.setHeader("Retry-After", "60");
        reject(res, 429, "Too many attempts. Wait a minute and try again.", "RATE_LIMIT");
        return false;
    }
    return true;
}
export async function handleAuth(req, res) {
    try {
        const origin = req.headers.origin;
        res.setHeader("Vary", "Origin");
        if (origin && !origins.has(origin))
            return reject(res, 403, "This request origin is not allowed.", "ORIGIN");
        if (origin) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token");
            res.writeHead(204);
            return res.end();
        }
        const path = new URL(req.url, "http://localhost:4200").pathname;
        if (req.method === "GET" && path === "/api/health")
            return send(res, 200, { ok: true, service: "cedar-session-demo" });
        await pause(250);
        if (req.method === "GET" && path === "/api/session") {
            const s = currentSession(req) || createSession(res);
            return send(res, 200, sessionResult(s));
        }
        if (req.method === "GET" && path === "/api/account") {
            const u = authUser(req, res);
            if (!u)
                return;
            const savedEvents = u.role === "admin"
                ? [{ id: "e2", title: "Community supper", date: "October 24" }]
                : [
                    { id: "e1", title: "A slower Saturday", date: "October 17" },
                    { id: "e3", title: "Sketchbook morning", date: "November 7" },
                ];
            return send(res, 200, {
                userId: u.id,
                memberSince: "September 2026",
                savedEvents,
            });
        }
        if (req.method === "GET" && path === "/api/admin/summary") {
            const u = authUser(req, res);
            if (!u)
                return;
            if (u.role !== "admin")
                return reject(res, 403, "A staff account is required for this information.", "FORBIDDEN");
            return send(res, 200, {
                members: users.length,
                activeSessions: [...sessions.values()].filter((s) => s.userId && s.expiresAt > Date.now()).length,
            });
        }
        if (req.method !== "POST")
            return reject(res, 404, "This endpoint does not exist.", "NOT_FOUND");
        const s = currentSession(req);
        if (!allowedWrite(req, res, s))
            return;
        const body = await readBody(req);
        if (path === "/api/login") {
            if (!rateLimit(req, res))
                return;
            const values = validate(loginSchema, body, res);
            if (!values)
                return;
            const u = users.find((u) => u.email === values.email);
            const hash = await passwordHash(values.password, u?.salt ?? dummySalt);
            if (!u || !timingSafeEqual(hash, u.hash))
                return reject(res, 401, "The email or password is incorrect.", "CREDENTIALS");
            return send(res, 200, sessionResult(createSession(res, u.id, s.id)));
        }
        if (path === "/api/register") {
            if (!rateLimit(req, res))
                return;
            const values = validate(registrationSchema, body, res);
            if (!values)
                return;
            if (users.some((u) => u.email === values.email))
                return reject(res, 409, "An account with this email already exists.", "EMAIL_TAKEN", { email: "Try signing in with this email." });
            const user = await makeUser(values.name, values.email, "member", values.password);
            // Recheck after asynchronous hashing before inserting the account.
            if (users.some((u) => u.email === values.email))
                return reject(res, 409, "An account with this email already exists.", "EMAIL_TAKEN");
            users.push(user);
            return send(res, 201, sessionResult(createSession(res, user.id, s.id)));
        }
        if (path === "/api/logout")
            return send(res, 200, sessionResult(createSession(res, null, s.id)));
        if (path === "/api/demo/expire") {
            if (!authUser(req, res))
                return;
            sessions.delete(s.id);
            return send(res, 200, { ok: true });
        }
        return reject(res, 404, "This endpoint does not exist.", "NOT_FOUND");
    }
    catch (error) {
        reject(res, error.status ?? 500, error.status
            ? error.message
            : "The local service could not complete the request.");
    }
}
export function requireUser(req, res, { staff = false, write = false } = {}) {
    const user = authUser(req, res);
    if (!user)
        return null;
    if (staff && user.role !== "admin") {
        reject(res, 403, "A staff account is required for this operation.", "FORBIDDEN");
        return null;
    }
    if (write && !allowedWrite(req, res, currentSession(req)))
        return null;
    return user;
}
