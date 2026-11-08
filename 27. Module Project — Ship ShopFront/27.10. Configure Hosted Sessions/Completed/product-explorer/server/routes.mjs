import { handleOrders } from "./orders.mjs";
import { handleAuth, requireUser } from "./auth.mjs";
const uploads = new URL("./uploads/", import.meta.url);
async function readBody(req) {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
        size += chunk.length;
        if (size > 2 * 1024 * 1024 + 20000)
            throw new Error("Upload too large.");
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}
import { productSchema } from "../shared/productSchema.ts";
import { mkdirSync } from "node:fs";
import { checkoutRequestSchema } from "../shared/checkoutSchema.ts";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const dataFile = fileURLToPath(new URL("./data.json", import.meta.url));
const controlFile = fileURLToPath(new URL("./control.json", import.meta.url));
if (!existsSync(dataFile))
    writeFileSync(dataFile, readFileSync(new URL("./seed.json", import.meta.url)));
const readProducts = () => JSON.parse(readFileSync(dataFile, "utf8"));
const send = (res, status, value) => {
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(value));
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function validate(value) {
    const checked = productSchema.safeParse(value);
    if (checked.success)
        return {};
    return Object.fromEntries(checked.error.issues.map((issue) => [issue.path.join("."), issue.message]));
}
export async function handleRequest(req, res) {
    try {
        const url = new URL(req.url, "http://127.0.0.1:4185");
        if (["/api/session", "/api/login", "/api/register", "/api/logout", "/api/demo/expire"].includes(url.pathname)) {
            await handleAuth(req, res);
            return;
        }
        if (url.pathname === "/api/orders" || url.pathname.startsWith("/api/orders/")) {
            await handleOrders(req, res, url.pathname, readProducts);
            return;
        }
        const inventoryWrite = (url.pathname.startsWith("/api/products/") && ["PATCH", "DELETE"].includes(req.method)) || (url.pathname === "/api/uploads" && req.method === "POST");
        if (inventoryWrite && !requireUser(req, res, { staff: true, write: true }))
            return;
        if (req.method === "POST" && url.pathname === "/api/checkout-drafts" && !requireUser(req, res, { write: true }))
            return;
        if (req.method === "GET" && url.pathname === "/api/health")
            return send(res, 200, { ok: true, service: "shopfront-catalog" });
        if (req.method === "POST" && url.pathname === "/api/checkout-drafts") {
            let body = "";
            for await (const chunk of req) {
                body += chunk;
                if (body.length > 20000)
                    return send(res, 413, { message: "Request too large." });
            }
            let value;
            try {
                value = JSON.parse(body);
            }
            catch {
                return send(res, 400, { message: "Send a JSON object." });
            }
            const checked = checkoutRequestSchema.safeParse(value);
            if (!checked.success)
                return send(res, 422, {
                    message: "Check your checkout details and bag.",
                });
            await delay(700);
            const { details, cart } = checked.data;
            const products = readProducts();
            if (details.contact.email === "blocked@example.com")
                return send(res, 409, {
                    message: "Use another email address for this checkout.",
                    field: "contact.email",
                });
            let cents = 0;
            for (const line of cart) {
                const p = products.find((p) => p.id === line.productId);
                if (!p || !p.inStock || line.quantity > p.maxQuantity)
                    return send(res, 409, {
                        message: "Availability changed. Review your bag before trying again.",
                    });
                cents += Math.round(p.price * 100) * line.quantity;
            }
            const result = {
                draftId: randomUUID().slice(0, 8),
                subtotal: cents / 100,
                deliveryFee: details.method === "express"
                    ? 12
                    : details.method === "standard"
                        ? 5
                        : 0,
                currency: "USD",
                items: cart.reduce((total, line) => total + line.quantity, 0),
            };
            const draftFile = new URL("./checkout-drafts.json", import.meta.url);
            const drafts = existsSync(draftFile)
                ? JSON.parse(readFileSync(draftFile, "utf8"))
                : [];
            drafts.push({ details, cart, ...result });
            writeFileSync(draftFile, JSON.stringify(drafts, null, 2));
            return send(res, 201, result);
        }
        if (req.method === "POST" && url.pathname === "/api/uploads") {
            const request = new Request("http://127.0.0.1:4185/api/uploads", {
                method: "POST",
                headers: { "Content-Type": req.headers["content-type"] ?? "" },
                body: await readBody(req),
            });
            const form = await request.formData();
            const file = form.get("image");
            if (!(file instanceof File) || file.size === 0)
                return send(res, 422, { message: "Choose an image file." });
            if (file.size > 2 * 1024 * 1024)
                return send(res, 413, {
                    message: "Choose an image no larger than 2 MB.",
                });
            const bytes = Buffer.from(await file.arrayBuffer());
            let extension;
            if (file.type === "image/png" &&
                bytes
                    .subarray(0, 8)
                    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
                extension = "png";
            if (file.type === "image/jpeg" &&
                bytes[0] === 255 &&
                bytes[1] === 216 &&
                bytes[2] === 255)
                extension = "jpg";
            if (file.type === "image/webp" &&
                bytes.subarray(0, 4).toString() === "RIFF" &&
                bytes.subarray(8, 12).toString() === "WEBP")
                extension = "webp";
            if (!extension)
                return send(res, 415, {
                    message: "Choose a PNG, JPEG or WebP image.",
                });
            mkdirSync(uploads, { recursive: true });
            const name = randomUUID() + "." + extension;
            writeFileSync(new URL(name, uploads), bytes);
            await delay(450);
            return send(res, 201, { url: "/uploads/" + name });
        }
        if (req.method === "GET" &&
            /^\/uploads\/[a-f0-9-]+\.(png|jpg|webp)$/.test(url.pathname)) {
            const name = url.pathname.split("/").at(-1);
            try {
                const bytes = readFileSync(new URL(name, uploads));
                const mime = name.endsWith(".png")
                    ? "image/png"
                    : name.endsWith(".jpg")
                        ? "image/jpeg"
                        : "image/webp";
                res.writeHead(200, {
                    "Content-Type": mime,
                    "X-Content-Type-Options": "nosniff",
                });
                res.end(bytes);
                return;
            }
            catch {
                return send(res, 404, { message: "Image not found." });
            }
        }
        if (!url.pathname.startsWith("/api/products"))
            return send(res, 404, { message: "Endpoint not found." });
        const controls = existsSync(controlFile)
            ? JSON.parse(readFileSync(controlFile, "utf8"))
            : {};
        const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
        const ms = controls.race
            ? q === "l"
                ? 1400
                : q === "lamp"
                    ? 150
                    : 180
            : controls.slow
                ? 1600
                : 180;
        await delay(ms);
        if (controls.fail)
            return send(res, 503, {
                message: "Catalog service is temporarily unavailable.",
            });
        const products = readProducts();
        if (req.method === "GET" && url.pathname === "/api/products") {
            let items = products.filter((p) => (!q || p.name.toLowerCase().includes(q)) &&
                (!url.searchParams.get("category") ||
                    p.category === url.searchParams.get("category")));
            const availability = url.searchParams.get("availability");
            if (availability === "in-stock")
                items = items.filter((p) => p.inStock);
            if (availability === "out-of-stock")
                items = items.filter((p) => !p.inStock);
            const sort = url.searchParams.get("sort");
            if (sort === "name")
                items.sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
            if (sort === "price-asc")
                items.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
            if (sort === "price-desc")
                items.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
            const total = items.length;
            const limit = url.searchParams.has("limit")
                ? Math.max(1, Math.min(24, Number(url.searchParams.get("limit")) || 3))
                : 100;
            const pages = Math.max(1, Math.ceil(total / limit));
            const page = Math.max(1, Math.min(pages, Math.floor(Number(url.searchParams.get("page")) || 1)));
            return send(res, 200, {
                items: items.slice((page - 1) * limit, page * limit),
                total,
                page,
                pages,
            });
        }
        const match = url.pathname.match(/^\/api\/products\/(p\d+)$/);
        const index = match ? products.findIndex((p) => p.id === match[1]) : -1;
        if (index < 0)
            return send(res, 404, { message: "Product not found." });
        if (req.method === "GET")
            return send(res, 200, products[index]);
        if (req.method === "DELETE") {
            products.splice(index, 1);
            writeFileSync(dataFile, JSON.stringify(products, null, 2));
            res.writeHead(204);
            return res.end();
        }
        if (req.method === "PATCH") {
            let body = "";
            for await (const chunk of req) {
                body += chunk;
                if (body.length > 10000)
                    return send(res, 413, { message: "Request too large." });
            }
            let payload;
            try {
                payload = JSON.parse(body);
            }
            catch {
                return send(res, 400, { message: "Send a JSON object." });
            }
            if (typeof payload !== "object" ||
                payload === null ||
                Array.isArray(payload))
                return send(res, 400, { message: "Send a JSON object." });
            const errors = validate(payload);
            if (Object.keys(errors).length)
                return send(res, 422, { message: "Check the product fields.", errors });
            await delay(650);
            if (products[index].id === "p1" && payload.price === 13)
                return send(res, 409, {
                    message: "This promotional price has not been approved.",
                    errors: { price: "Choose another price for this product." },
                });
            if (payload.name.trim() === "Reserved product")
                return send(res, 409, {
                    message: "That product name is reserved.",
                    errors: { name: "Choose another product name." },
                });
            const { name, category, price, description, inStock, maxQuantity, image, features, } = productSchema.parse(payload);
            products[index] = {
                ...products[index],
                name: name.trim(),
                category,
                price,
                description: description.trim(),
                inStock,
                maxQuantity,
                image,
                features,
            };
            writeFileSync(dataFile, JSON.stringify(products, null, 2));
            return send(res, 200, products[index]);
        }
        return send(res, 405, { message: "Method not supported." });
    }
    catch (error) {
        console.error(error);
        if (!res.headersSent)
            send(res, 500, { message: "Local API error." });
        else
            res.end();
    }
}
