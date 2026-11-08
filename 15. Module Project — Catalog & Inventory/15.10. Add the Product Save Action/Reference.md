# Add the Product Save Action — references

**Goal:** Implement the checked PATCH request and route action for validated product updates.

## Teaching sequence

- Implement the request that saves a draft
- Trace a save without losing the draft
- Send the validated update to the API
- Check the write contract

## Official API references

- [Route actions](https://reactrouter.com/start/data/actions)
- [Request.formData](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData)

## Checkpoint outcome

The checked PATCH helper and saveProductAction are implemented, but the form and route action are not connected yet. Save remains disabled. The terminal check writes directly to the API, then resets the six sample products and normal timing.

## Included source

- `product-explorer/src/api.ts`
- `product-explorer/src/actions.ts`
- `product-explorer/src/productForm.ts`
- `product-explorer/src/ProductEditor.tsx`

Use `Starter/product-explorer/src` to compare the starting code with the completed checkpoint. New files introduced in this lesson appear in the completed `product-explorer/src` folder.

## Supplied service

The supplied service is implemented in `product-explorer/server/index.mjs`, with the same files under `Starter/product-explorer/server` for the starting checkpoint.

- `GET /api/health` reports the running API.
- `GET /api/products` returns `items`, `total`, `page` and `pages`, with supported query values applied by the server.
- `GET /api/products/:id` returns one product or a missing-product response.

Use `http://127.0.0.1:4185` for direct API checks; the application at `http://127.0.0.1:5185` uses Vite's `/api` proxy. Keep the browser's bag and delivery choices separate from current API records and local editor drafts.

`PATCH /api/products/:id` accepts the editable JSON fields and returns the updated product after a successful write. Missing products return 404; invalid input is rejected. `Requests/update-p1.json` supplies the direct write example, and Setup.md contains its exact command and reset check. The route action runs in the browser and awaits the backend request. Cancelling a request does not undo a server write.

