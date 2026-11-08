# Load the Catalog — references

**Goal:** Validate API list data and supply the catalog, cart and inventory through loaders.

## Teaching sequence

- Replace the local catalog with route data
- Add a checked Fetch helper
- Load the list before rendering it

## Official API references

- [Route loaders](https://reactrouter.com/start/data/data-loading)
- [useLoaderData](https://reactrouter.com/api/hooks/useLoaderData)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Checkpoint outcome

Collection, cart and inventory load API lists. The product page still uses local data until the product-loading step.

The completed source is in `product-explorer/src`; the starting source is in `Starter/product-explorer/src`. The supplied practice service is in `product-explorer/server`: `/api/health` checks the service, `/api/products` returns the list, and `/api/products/:id` returns a product. Client route actions run in the browser and use existing backend endpoints. A request abort does not undo a server write. Keep browser shopper choices separate from current API records and local editor drafts.
