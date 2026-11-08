# Build the Product Draft Form — setup

**Goal:** Model and validate editable values, then load and edit a local product draft.

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

The editor loads a product and holds local draft values. Save remains disabled with type='button', and the ordinary form prevents submission. Cancel returns to inventory without an API write.

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

