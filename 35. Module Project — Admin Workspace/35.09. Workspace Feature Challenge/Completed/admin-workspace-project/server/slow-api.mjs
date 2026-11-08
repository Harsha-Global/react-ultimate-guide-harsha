import { createCatalogServer } from "./catalog-api.mjs";
createCatalogServer({ delayMs: 5000 }).listen(5191, "127.0.0.1", () => console.log("Slow-save catalog API: http://127.0.0.1:5191/api/health (five-second writes; restart resets data)"));
