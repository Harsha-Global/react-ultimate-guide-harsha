import { writeFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Example } from "./.server/Example.js";
import { page } from "./html.mjs";
const markup = renderToString(createElement(Example, { interactive: false }));
writeFileSync(
  new URL("./dist/static.html", import.meta.url),
  page("static", markup),
);
console.log("Prepared dist/static.html at build time.");
