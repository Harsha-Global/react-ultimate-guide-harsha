# Add the Product Save Action — setup

**Goal:** Implement the checked PATCH request and route action for validated product updates.

Start with `Starter/product-explorer`. The completed checkpoint is `product-explorer`; their source folders are `Starter/product-explorer/src` and `product-explorer/src`. Continue one working app, using the completed copy for comparison or recovery.

## Runtime

Node.js >=22.22.0; React/React DOM 19.3.0; React Router 8.4.0; Vite 8.3.0; TypeScript 6.0.3. These are the supplied project versions.

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

The included stylesheet is `product-explorer/src/index.css`; `product-explorer/src/main.tsx` imports it. The starting copy has the same paths under `Starter/product-explorer`. Runtime assets and licenses are under `product-explorer/public/assets`.

The checked PATCH helper and saveProductAction are implemented, but the form and route action are not connected yet. Save remains disabled. The terminal check writes directly to the API, then resets the six sample products and normal timing.

API practice changes persist in `server/data.json`; a server restart does not reset them. `npm run api:reset` restores six seed products and normal timing without clearing saved browser bag and delivery values. The supplied `server/seed.json` contains six sample products. `server/data.json` holds the API's current records and is created from that seed when absent. Student checkpoints start from the seed; generated control state is omitted. Keep existing product IDs and persistence keys.

```bat
node server/control.mjs slow
node server/control.mjs fail
node server/control.mjs race
node server/control.mjs normal
npm run check
npm run lint
npm run build
```

Use one control mode at a time and finish in normal mode. Race timing is reserved for the later cancellation investigation. These supplied backend utilities support the demonstration; their implementation is not taught here.

Compare the included completed and starting source folders. Reference.md identifies the relevant files and supplied endpoints.

The included request is `Requests/update-p1.json` at the archive root. From the running `product-explorer` folder, use `curl.exe` explicitly in PowerShell or Command Prompt:

```bat
curl.exe -i -X PATCH http://127.0.0.1:4185/api/products/p1 -H "Content-Type: application/json" --data-binary "@../Requests/update-p1.json"
npm run api:reset
curl.exe http://127.0.0.1:4185/api/products/p1
curl.exe http://127.0.0.1:4185/api/products
```

Inspect the actual HTTP 200 response and saved price 89 before resetting. After reset, verify the backpack price is 79 and the list contains six products; the browser's bag and delivery preferences remain.

