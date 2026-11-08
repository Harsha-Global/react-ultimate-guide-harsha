import { writeFileSync, readFileSync } from "node:fs";
writeFileSync(new URL("./data.json", import.meta.url), readFileSync(new URL("./seed.json", import.meta.url)));
writeFileSync(new URL("./control.json", import.meta.url), "{}");
console.log("Reset the local course catalog to six seed products. Browser cart/preferences are unchanged.");
try {
    await (await import("node:fs/promises")).rm(new URL("./checkout-drafts.json", import.meta.url), { force: true });
}
catch {
    /* No drafts yet. */
}
await (await import("node:fs/promises")).rm(new URL("./uploads/", import.meta.url), { force: true, recursive: true });
