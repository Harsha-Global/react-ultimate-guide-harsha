# Load the Catalog — setup

**Goal:** Validate API list data and supply the catalog, cart and inventory through loaders.

Continue the existing `product-explorer` project. Completed main source: `product-explorer`. Continue one working app; each completed copy is a comparison/recovery checkpoint.

## Runtime

Node.js >=22.22.0; React/React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0; TypeScript 6.0.3. These are the existing reproducible source pins, retained during the split; this reorganization does not claim a fresh latest-release check.

```bat
cd /d C:\react\product-explorer
npm ci
npm run api
```

Leave that terminal running. In a second terminal:

```bat
cd /d C:\react\product-explorer
npm run dev
```

App: http://127.0.0.1:5185. API health: http://127.0.0.1:4185/api/health. Vite proxies `/api` to 4185. Stop only the previous course copy using these ports before switching source copies. Fonts and images are local; the first dependency installation needs internet access.

## Prepared resources and checkpoint

The included stylesheet is `product-explorer/src/index.css`; `product-explorer/src/main.tsx` imports it. Runtime assets/licenses are under `product-explorer/public/assets`.

Collection, cart and inventory load API lists. The product page still uses local data until the product-loading step.

API practice changes persist in `server/data.json`; a server restart does not reset them. `npm run api:reset` restores six seed products and normal timing without clearing saved browser bag/delivery values. The included `server/data.json` starts from the six seed products; generated control state is omitted. Keep existing product ids and persistence keys.

```bat
node server/control.mjs slow
node server/control.mjs fail
node server/control.mjs race
node server/control.mjs normal
npm run check
npm run lint
npm run build
```

Use one control mode at a time and finish in normal mode. Race timing is reserved for the later isolated investigation. These supplied backend utilities support the demonstration; their implementation is not taught here.

Next teaching goal: **Load Products & Handle Failures**. Compare the included starting and completed source to review these changes. For this checkpoint, verify the six loaded collection products, the existing bag and delivery preferences, and the inventory list. Inspect `/api/products` in the browser Network panel for a successful response with items, total, page and pages.
