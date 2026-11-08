# Define Shareable Catalog Views — references

**Goal:** Normalize the query contract and let the loader fetch the applied view.

## Teaching sequence

- A client change that exposes local-only filters
- Separate the draft from the applied view
- Define the catalog query contract
- Let the loader apply the query

## Official API references

- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Data loading](https://reactrouter.com/start/data/data-loading)

## Checkpoint outcome

The query contract and collection loader interpret the applied view in the address. Search and category controls still use local component state. Use a direct query address to test the loader; connecting the controls comes next.

## Included source

- `product-explorer/src/catalogView.ts`
- `product-explorer/src/loaders.ts`
- `product-explorer/src/router.tsx`
- `product-explorer/src/Catalog.tsx`

Use `Starter/product-explorer/src` to compare the starting code with the completed checkpoint. New files introduced in this lesson appear in the completed `product-explorer/src` folder.

## Supplied service

The supplied service is implemented in `product-explorer/server/index.mjs`, with the same files under `Starter/product-explorer/server` for the starting checkpoint.

- `GET /api/health` reports the running API.
- `GET /api/products` returns `items`, `total`, `page` and `pages`, with supported query values applied by the server.
- `GET /api/products/:id` returns one product or a missing-product response.

Use `http://127.0.0.1:4185` for direct API checks; the application at `http://127.0.0.1:5185` uses Vite's `/api` proxy. Keep the browser's bag and delivery choices separate from current API records and local editor drafts.

