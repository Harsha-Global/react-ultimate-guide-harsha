import { createServer } from "node:http";
import { handleApi } from "./routes.mjs";
const slow = process.argv.includes("--slow");
createServer((req, res) => handleApi(req, res, slow)).listen(4318, "127.0.0.1", () => {
    console.log("Willow API ready at http://127.0.0.1:4318");
});
