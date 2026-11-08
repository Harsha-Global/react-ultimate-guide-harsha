import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const dataFile = fileURLToPath(new URL("./data.json", import.meta.url));
const controlFile = fileURLToPath(new URL("./control.json", import.meta.url));
if (!existsSync(dataFile))
  writeFileSync(
    dataFile,
    readFileSync(new URL("./seed.json", import.meta.url)),
  );
const readProducts = () => JSON.parse(readFileSync(dataFile, "utf8"));
const send = (res, status, value) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function validate(v) {
  const errors = {};
  if (
    typeof v.name !== "string" ||
    v.name.trim().length < 2 ||
    v.name.trim().length > 80
  )
    errors.name = "Use 2 to 80 characters for the name.";
  if (!["Home", "Travel", "Audio"].includes(v.category))
    errors.category = "Choose a listed category.";
  if (
    typeof v.price !== "number" ||
    !Number.isFinite(v.price) ||
    v.price <= 0 ||
    v.price > 10000 ||
    Math.abs(v.price * 100 - Math.round(v.price * 100)) > 0.00001
  )
    errors.price =
      "Enter a price from 0.01 to 10000, with at most two decimal places.";
  if (
    typeof v.description !== "string" ||
    v.description.trim().length < 10 ||
    v.description.trim().length > 240
  )
    errors.description = "Use 10 to 240 characters for the description.";
  if (typeof v.inStock !== "boolean")
    errors.inStock = "Choose an availability value.";
  if (
    !Number.isInteger(v.maxQuantity) ||
    v.maxQuantity < 0 ||
    v.maxQuantity > 99 ||
    (v.inStock && v.maxQuantity < 1) ||
    (!v.inStock && v.maxQuantity !== 0)
  )
    errors.maxQuantity = "Use 1 to 99 when in stock, or 0 when unavailable.";
  return errors;
}
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:4185");
    if (req.method === "GET" && url.pathname === "/api/health")
      return send(res, 200, { ok: true, service: "shopfront-catalog" });
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
      let items = products.filter(
        (p) =>
          (!q || p.name.toLowerCase().includes(q)) &&
          (!url.searchParams.get("category") ||
            p.category === url.searchParams.get("category")),
      );
      const availability = url.searchParams.get("availability");
      if (availability === "in-stock") items = items.filter((p) => p.inStock);
      if (availability === "out-of-stock")
        items = items.filter((p) => !p.inStock);
      const sort = url.searchParams.get("sort");
      if (sort === "name")
        items.sort(
          (a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id),
        );
      if (sort === "price-asc")
        items.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
      if (sort === "price-desc")
        items.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
      const total = items.length;
      const limit = url.searchParams.has("limit")
        ? Math.max(1, Math.min(24, Number(url.searchParams.get("limit")) || 3))
        : 100;
      const pages = Math.max(1, Math.ceil(total / limit));
      const page = Math.max(
        1,
        Math.min(pages, Math.floor(Number(url.searchParams.get("page")) || 1)),
      );
      return send(res, 200, {
        items: items.slice((page - 1) * limit, page * limit),
        total,
        page,
        pages,
      });
    }
    const match = url.pathname.match(/^\/api\/products\/(p\d+)$/);
    const index = match ? products.findIndex((p) => p.id === match[1]) : -1;
    if (index < 0) return send(res, 404, { message: "Product not found." });
    if (req.method === "GET") return send(res, 200, products[index]);
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
      } catch {
        return send(res, 400, { message: "Send a JSON object." });
      }
      if (
        typeof payload !== "object" ||
        payload === null ||
        Array.isArray(payload)
      )
        return send(res, 400, { message: "Send a JSON object." });
      const errors = validate(payload);
      if (Object.keys(errors).length)
        return send(res, 422, { message: "Check the product fields.", errors });
      const { name, category, price, description, inStock, maxQuantity } =
        payload;
      products[index] = {
        ...products[index],
        name: name.trim(),
        category,
        price,
        description: description.trim(),
        inStock,
        maxQuantity,
      };
      writeFileSync(dataFile, JSON.stringify(products, null, 2));
      return send(res, 200, products[index]);
    }
    return send(res, 405, { message: "Method not supported." });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) send(res, 500, { message: "Local API error." });
    else res.end();
  }
}).listen(4185, "127.0.0.1", () =>
  console.log("ShopFront local API: http://127.0.0.1:4185/api/health"),
);
