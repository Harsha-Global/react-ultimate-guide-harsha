import { rm } from "node:fs/promises";
await rm(new URL("./data.json", import.meta.url), { force: true });
console.log("Practice records reset. Restart the stopped API.");
