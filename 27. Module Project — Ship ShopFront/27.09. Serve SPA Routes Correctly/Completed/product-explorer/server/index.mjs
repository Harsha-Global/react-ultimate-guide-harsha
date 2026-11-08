import { createServer } from "node:http";
import { handleRequest } from "./routes.mjs";
createServer(handleRequest).listen(4185, "127.0.0.1", () => console.log("ShopFront local API: http://127.0.0.1:4185/api/health"));
