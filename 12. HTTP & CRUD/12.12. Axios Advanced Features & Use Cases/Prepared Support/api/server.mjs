import { createServer } from "node:http";

const seed = [
  {
    id: "e1",
    name: "Avery Stone",
    role: "Designer",
    team: "Product",
    email: "avery@example.test",
    active: true,
  },
  {
    id: "e2",
    name: "Maya Patel",
    role: "Engineer",
    team: "Platform",
    email: "maya@example.test",
    active: true,
  },
  {
    id: "e3",
    name: "Jordan Lee",
    role: "Researcher",
    team: "Product",
    email: "jordan@example.test",
    active: false,
  },
];
let employees = structuredClone(seed);
let nextId = 4;
const attachments = new Map();

function json(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "http://localhost:5173",
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  response.end(JSON.stringify(body));
}

async function bodyJson(request) {
  let text = "";
  for await (const chunk of request) {
    text += chunk;
    if (text.length > 16_384) throw new Error("Request body is too large.");
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Send valid JSON.");
  }
}

function employeeInput(value, partial = false) {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return null;
  const fields = ["name", "role", "team", "email", "active"];
  if (!partial && fields.some((key) => !(key in value))) return null;
  if (Object.keys(value).some((key) => !fields.includes(key))) return null;
  if (
    ["name", "role", "team", "email"].some(
      (key) =>
        key in value &&
        (typeof value[key] !== "string" ||
          !value[key].trim() ||
          value[key].length > 120),
    )
  )
    return null;
  if ("active" in value && typeof value.active !== "boolean") return null;
  if ("email" in value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    return null;
  return value;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const method = request.method ?? "GET";
  const requestId = request.headers["x-request-id"];
  if (typeof requestId === "string" && /^[a-f0-9-]{36}$/i.test(requestId))
    response.setHeader("X-Request-Id", requestId);
  if (method === "OPTIONS") return json(response, 204, null);
  if (url.pathname === "/api/health" && method === "GET")
    return json(response, 200, { status: "ok" });
  if (url.pathname === "/api/employees" && method === "GET")
    return json(response, 200, employees);
  if (url.pathname === "/api/employees/reset" && method === "POST") {
    employees = structuredClone(seed);
    nextId = 4;
    attachments.clear();
    return json(response, 200, employees);
  }
  if (url.pathname === "/api/employees" && method === "POST") {
    try {
      const input = employeeInput(await bodyJson(request));
      if (!input)
        return json(response, 400, {
          message: "Enter a complete, valid employee.",
        });
      const created = { id: `e${nextId++}`, ...input };
      employees.push(created);
      return json(response, 201, created);
    } catch (error) {
      return json(response, 400, { message: error.message });
    }
  }
  const attachmentMatch = /^\/api\/employees\/([^/]+)\/attachment$/.exec(
    url.pathname,
  );
  if (attachmentMatch && method === "POST") {
    const id = decodeURIComponent(attachmentMatch[1]);
    if (!employees.some((employee) => employee.id === id))
      return json(response, 404, { message: "Employee not found." });
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 1024 * 1024 + 16_384) {
          json(response, 413, { message: "File is too large." });
          return;
        }
        chunks.push(chunk);
      }
      const parsed = await new Request("http://localhost/upload", {
        method: "POST",
        headers: { "content-type": request.headers["content-type"] ?? "" },
        body: Buffer.concat(chunks),
      }).formData();
      const file = parsed.get("attachment");
      if (
        !(file instanceof File) ||
        file.type !== "text/plain" ||
        file.size > 1024 * 1024
      )
        return json(response, 400, {
          message: "Send one plain-text attachment up to 1 MiB.",
        });
      // Teaching delay: receiving bytes is not the same as confirming the operation.
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!employees.some((employee) => employee.id === id))
        return json(response, 404, { message: "Employee no longer exists." });
      attachments.set(id, {
        fileName: file.name,
        bytes: Buffer.from(await file.arrayBuffer()),
      });
      return json(response, 201, {
        employeeId: id,
        fileName: file.name,
        bytes: file.size,
      });
    } catch {
      return json(response, 400, {
        message: "Send valid multipart form data.",
      });
    }
  }
  const match = /^\/api\/employees\/([^/]+)$/.exec(url.pathname);
  if (!match) return json(response, 404, { message: "Endpoint not found." });
  const id = decodeURIComponent(match[1]);
  const index = employees.findIndex((employee) => employee.id === id);
  if (index < 0) return json(response, 404, { message: "Employee not found." });
  if (method === "GET") {
    const delay = Math.min(
      2000,
      Math.max(0, Number(url.searchParams.get("delay")) || 0),
    );
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    return json(response, 200, employees[index]);
  }
  if (method === "DELETE") {
    employees.splice(index, 1);
    attachments.delete(id);
    response.writeHead(204, {
      "access-control-allow-origin": "http://localhost:5173",
    });
    return response.end();
  }
  if (method === "PUT" || method === "PATCH") {
    try {
      const input = employeeInput(await bodyJson(request), method === "PATCH");
      if (!input)
        return json(response, 400, { message: "Enter valid employee fields." });
      employees[index] = { ...employees[index], ...input, id };
      return json(response, 200, employees[index]);
    } catch (error) {
      return json(response, 400, { message: error.message });
    }
  }
  return json(response, 405, { message: "Method not allowed." });
});

const port = Number(process.env.API_PORT ?? 4173);
server.listen(port, "127.0.0.1", () =>
  console.log(`Employee API: http://localhost:${port}/api/health`),
);
