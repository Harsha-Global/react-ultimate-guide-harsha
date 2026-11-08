import { createServer } from "node:http";

const seed = [];
let employees = structuredClone(seed);
let nextId = 4;

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "http://localhost:5173", "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS", "access-control-allow-headers": "content-type" });
  response.end(JSON.stringify(body));
}

async function bodyJson(request) {
  let text = "";
  for await (const chunk of request) {
    text += chunk;
    if (text.length > 16_384) throw new Error("Request body is too large.");
  }
  try { return JSON.parse(text); } catch { throw new Error("Send valid JSON."); }
}

function employeeInput(value, partial = false) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const fields = ["name", "role", "team", "email", "active"];
  if (!partial && fields.some(key => !(key in value))) return null;
  if (Object.keys(value).some(key => !fields.includes(key))) return null;
  if (["name", "role", "team", "email"].some(key =>
    key in value && (typeof value[key] !== "string" || !value[key].trim() || value[key].length > 120))) return null;
  if ("active" in value && typeof value.active !== "boolean") return null;
  if ("email" in value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return null;
  return value;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const method = request.method ?? "GET";
  if (method === "OPTIONS") return json(response, 204, null);
  if (url.pathname === "/api/health" && method === "GET") return json(response, 200, { status: "ok" });
  if (url.pathname === "/api/employees" && method === "GET") return json(response, 200, employees);
  if (url.pathname === "/api/employees/reset" && method === "POST") {
    employees = structuredClone(seed); nextId = 4;
    return json(response, 200, employees);
  }
  if (url.pathname === "/api/employees" && method === "POST") {
    try {
      const input = employeeInput(await bodyJson(request));
      if (!input) return json(response, 400, { message: "Enter a complete, valid employee." });
      const created = { id: `e${nextId++}`, ...input };
      employees.push(created);
      return json(response, 201, created);
    } catch (error) { return json(response, 400, { message: error.message }); }
  }
  const match = /^\/api\/employees\/([^/]+)$/.exec(url.pathname);
  if (!match) return json(response, 404, { message: "Endpoint not found." });
  const id = decodeURIComponent(match[1]);
  const index = employees.findIndex(employee => employee.id === id);
  if (index < 0) return json(response, 404, { message: "Employee not found." });
  if (method === "GET") {
    const delay = Math.min(2000, Math.max(0, Number(url.searchParams.get("delay")) || 0));
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    return json(response, 200, employees[index]);
  }
  if (method === "DELETE") {
    employees.splice(index, 1);
    response.writeHead(204, { "access-control-allow-origin": "http://localhost:5173" });
    return response.end();
  }
  if (method === "PUT" || method === "PATCH") {
    try {
      const input = employeeInput(await bodyJson(request), method === "PATCH");
      if (!input) return json(response, 400, { message: "Enter valid employee fields." });
      employees[index] = { ...employees[index], ...input, id };
      return json(response, 200, employees[index]);
    } catch (error) { return json(response, 400, { message: error.message }); }
  }
  return json(response, 405, { message: "Method not allowed." });
});

const port = Number(process.env.API_PORT ?? 4176);
server.listen(port, "127.0.0.1", () => console.log(`Employee API: http://localhost:${port}/api/health`));
