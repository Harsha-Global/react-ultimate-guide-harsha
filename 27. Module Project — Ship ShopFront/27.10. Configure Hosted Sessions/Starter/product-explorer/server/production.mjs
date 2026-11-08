import { createServer } from "node:http";
import { serveBrowser } from "./staticFiles.mjs";
const port = Number(process.env.PORT ?? 5186);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Use a valid PORT.");
process.env.NODE_ENV = "production";
const { handleRequest } = await import("./routes.mjs");
createServer(async (req, res) => {
  try {
    const path = new URL(req.url, "http://localhost").pathname;
    if (path.startsWith("/api/demo/") || path === "/session-check.html") {
      res.writeHead(404, { "Content-Type": "application/json" }); res.end(JSON.stringify({ message: "Endpoint not found." })); return;
    }
    if (path.startsWith("/api/") || path.startsWith("/uploads/")) await handleRequest(req, res);
    else await serveBrowser(req, res, path);
  } catch { if (!res.headersSent) res.writeHead(500); res.end("The demo could not complete the request."); }
}).listen(port, "0.0.0.0", () => console.log(`ShopFront production demo listening on ${port}`));
