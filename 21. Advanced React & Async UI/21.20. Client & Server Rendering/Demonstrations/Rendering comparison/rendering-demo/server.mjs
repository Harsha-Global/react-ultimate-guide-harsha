import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Example } from "./.server/Example.js";
import { page } from "./html.mjs";
const port = Number(process.env.PORT ?? 5241);
const server = createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.writeHead(405).end();
    return;
  }
  if (pathname === "/") {
    response.writeHead(302, { Location: "/client" }).end();
    return;
  }
  if (
    pathname === "/client" ||
    pathname === "/server" ||
    pathname === "/static"
  ) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    if (pathname === "/static") {
      response.end(
        readFileSync(new URL("./dist/static.html", import.meta.url)),
      );
      return;
    }
    const mode = pathname.slice(1);
    const markup =
      mode === "server" ? renderToString(createElement(Example)) : "";
    response.end(page(mode, markup));
    return;
  }
  if (/^\/(assets|fonts)\/[a-zA-Z0-9_.-]+$/.test(pathname)) {
    try {
      const extension = pathname.split(".").pop();
      const type = {
        js: "text/javascript",
        css: "text/css",
        woff2: "font/woff2",
      }[extension];
      if (!type) {
        response.writeHead(404).end();
        return;
      }
      response.setHeader("Content-Type", type);
      response.end(readFileSync(new URL("./dist" + pathname, import.meta.url)));
      return;
    } catch {
      /* Missing asset: use the same 404 below. */
    }
  }
  response.writeHead(404).end("Not found");
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Rendering comparison: http://localhost:${port}/client`),
);
