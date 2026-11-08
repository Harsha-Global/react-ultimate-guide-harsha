import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".json": "application/json" };
const pages = /^\/(?:|cart|checkout|login|orders|inventory|products\/p\d+|inventory\/p\d+\/edit)$/;
export async function serveBrowser(req, res, pathname) {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return;
  }
  const decoded = decodeURIComponent(pathname);
  // Only known application page paths get index.html; missing files remain404.
  const navigation = pages.test(decoded) && (req.headers.accept ?? "").includes("text/html");
  const relative = navigation ? "index.html" : decoded.slice(1);
  const file = resolve(root, relative);
  if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) {
    res.writeHead(404); res.end("Not found."); return;
  }
  try {
    const bytes = await readFile(file);
    const cache = relative.startsWith("assets/") && /-[a-zA-Z0-9_-]{8,}\.(js|css)$/.test(relative)
      ? "public, max-age=31536000, immutable" : "no-cache";
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream", "Cache-Control": cache, "X-Content-Type-Options": "nosniff" });
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("Not found."); }
}
