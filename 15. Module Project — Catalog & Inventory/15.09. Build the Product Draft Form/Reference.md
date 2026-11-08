# Build the Product Draft Form — references

**Goal:** Model and validate editable values, then load and edit a local product draft.

## Teaching sequence

- Turn the inventory into an editing workflow
- Define editable values and validation
- Build the editor from the loaded product
- Open a product draft from inventory

## Official API references

- [Controlled inputs](https://react.dev/reference/react-dom/components/input)
- [useState](https://react.dev/reference/react/useState)

## Checkpoint outcome

The editor loads a product and holds local draft values. Save remains disabled with type='button', and the ordinary form prevents submission. Cancel returns to inventory without an API write.

## Included source

- `product-explorer/src/api.ts`
- `product-explorer/src/productForm.ts`
- `product-explorer/src/ProductEditor.tsx`
- `product-explorer/src/Inventory.tsx`
- `product-explorer/src/router.tsx`

Use `Starter/product-explorer/src` to compare the starting code with the completed checkpoint. New files introduced in this lesson appear in the completed `product-explorer/src` folder.

## Supplied service

The supplied service is implemented in `product-explorer/server/index.mjs`, with the same files under `Starter/product-explorer/server` for the starting checkpoint.

- `GET /api/health` reports the running API.
- `GET /api/products` returns `items`, `total`, `page` and `pages`, with supported query values applied by the server.
- `GET /api/products/:id` returns one product or a missing-product response.

Use `http://127.0.0.1:4185` for direct API checks; the application at `http://127.0.0.1:5185` uses Vite's `/api` proxy. Keep the browser's bag and delivery choices separate from current API records and local editor drafts.

