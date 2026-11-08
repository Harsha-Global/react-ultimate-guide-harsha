import { writeFile } from "node:fs/promises";
import { seeds } from "./seeds.mjs";
await writeFile(
  new URL("./data.json", import.meta.url),
  JSON.stringify(seeds, null, 2),
);
console.log("Practice records reset. Restart the API to reload them.");
