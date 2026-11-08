import { readFileSync } from "node:fs";
const template = readFileSync(
  new URL("./dist/index.html", import.meta.url),
  "utf8",
);
const labels = {
  client: [
    "Client rendering",
    "The response has an empty workshop root. Browser JavaScript creates the card and its interactions.",
  ],
  server: [
    "Server rendering",
    "The server renders the workshop into this response. Browser JavaScript hydrates the same card.",
  ],
  static: [
    "Static rendering",
    "The build created this workshop HTML once. This example serves it without browser JavaScript.",
  ],
};
export function page(mode, markup) {
  let html = template
    .replace("<!--mode-->", mode)
    .replace("<!--mode-label-->", labels[mode][0])
    .replace("<!--mode-detail-->", labels[mode][1])
    .replace("<!--app-html-->", markup);
  if (mode === "static")
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  return html;
}
