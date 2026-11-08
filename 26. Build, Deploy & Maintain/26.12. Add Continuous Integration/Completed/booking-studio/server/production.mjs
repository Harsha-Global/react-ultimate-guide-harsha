import { createServer } from "node:http";
import { handleApi } from "./routes.mjs";
import { serveBuiltFile } from "./staticFiles.mjs";
const port = Number(process.env.PORT ?? 4318);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Use a valid PORT.");
createServer(async (req, res) => {
    const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
    if (pathname === "/api/reset") {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "That API route does not exist." }));
    }
    if (pathname.startsWith("/api/")) return handleApi(req, res);
    return serveBuiltFile(req, res, pathname);
}).listen(port, "0.0.0.0", () => console.log(`Booking Studio listening on port ${port}`));
