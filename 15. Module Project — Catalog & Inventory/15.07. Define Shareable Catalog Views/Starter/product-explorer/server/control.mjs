import { writeFileSync } from "node:fs";
const mode = process.argv[2] ?? "normal";
if (!["normal", "slow", "fail", "race"].includes(mode))
  throw new Error("Use normal, slow, fail, or race.");
writeFileSync(
  new URL("./control.json", import.meta.url),
  JSON.stringify(mode === "normal" ? {} : { [mode]: true }),
);
console.log("Local course API mode:", mode);
