import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain; charset=utf-8" };
function fail(res, status) { res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" }); res.end("Not found"); }
export async function serveBuiltFile(req, res, pathname) {
    if (req.method !== "GET" && req.method !== "HEAD") return fail(res, 405);
    let decoded;
    try { decoded = decodeURIComponent(pathname); } catch { return fail(res, 400); }
    // This app's confirmation is a query string at /. It needs no wildcard route fallback.
    const file = resolve(root, decoded === "/" ? "index.html" : "." + decoded);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) return fail(res, 404);
    try {
        if (!(await stat(file)).isFile()) return fail(res, 404);
        const bytes = await readFile(file);
        res.writeHead(200, {
            "Content-Type": mime[extname(file)] ?? "application/octet-stream",
            "Cache-Control": pathname.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache",
            "X-Content-Type-Options": "nosniff"
        });
        res.end(req.method === "HEAD" ? undefined : bytes);
    } catch { fail(res, 404); }
}
