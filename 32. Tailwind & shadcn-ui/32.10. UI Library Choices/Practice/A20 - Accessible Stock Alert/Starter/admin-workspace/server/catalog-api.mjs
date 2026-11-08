import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { products } from "../src/catalog.ts";
import { productEditSchema } from "../src/productSchema.ts";

export function createCatalogServer({ delayMs = 700 } = {}) {
  const inventory = structuredClone(products);
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    const send = (status, body) => { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); };
    if (req.method === "GET" && url.pathname === "/api/health") return send(200, { status: "ok" });
    if (req.method === "GET" && url.pathname === "/api/products") return send(200, { items: inventory });
    const match = /^\/api\/products\/([^/]+)$/.exec(url.pathname);
    if (req.method !== "PATCH" || !match) return send(404, { message: "Endpoint not found." });
    let id;
    try { id = decodeURIComponent(match[1]); } catch { return send(400, { message: "Invalid product path." }); }
    const product = inventory.find((item) => item.id === id);
    if (!product) return send(404, { message: "Product not found." });
    let body;
    try {
      let text = "";
      for await (const chunk of req) { text += chunk; if (text.length > 32768) { send(413, { message: "Request is too large." }); return; } }
      body = JSON.parse(text);
    } catch { return send(400, { message: "Send a valid JSON body." }); }
    const result = productEditSchema.safeParse(body);
    await new Promise((done) => setTimeout(done, delayMs));
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) { const field = issue.path[0]; if (field === "name" || field === "stock" || field === "reorderLevel") fieldErrors[field] ??= issue.message; }
      return send(422, { message: "Check the highlighted fields.", fieldErrors });
    }
    const duplicate = inventory.some((item) => item.id !== product.id && item.name.toLowerCase() === result.data.name.toLowerCase());
    if (duplicate) return send(422, { message: "Check the product name.", fieldErrors: { name: "Another product already uses this name." } });
    Object.assign(product, result.data);
    return send(200, { product });
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createCatalogServer().listen(5191, "127.0.0.1", () => console.log("Catalog API: http://127.0.0.1:5191/api/health (in-memory demo; restart resets data)"));
}
