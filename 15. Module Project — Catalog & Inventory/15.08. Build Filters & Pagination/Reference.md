# Build Filters & Pagination — references

**Goal:** Apply the filter form, render pagination and preserve the same view through product navigation.

## Teaching sequence

- Apply and navigate the same catalog view
- Submit named controls through a GET form
- Render the page and preserve its return address
- Verify the client's request

## Official API references

- [Form](https://reactrouter.com/api/components/Form)
- [Link](https://reactrouter.com/api/components/Link)

## Checkpoint outcome

The GET filter form, page links and product return links use the same applied query. Reload and browser Back restore that view; applying a new filter begins at page one.

## Included source

- `product-explorer/src/Catalog.tsx`
- `product-explorer/src/ProductCard.tsx`
- `product-explorer/src/ProductPage.tsx`
- `product-explorer/src/catalogView.ts`

Use `Starter/product-explorer/src` to compare the starting code with the completed checkpoint. New files introduced in this lesson appear in the completed `product-explorer/src` folder.

## Supplied service

The supplied service is implemented in `product-explorer/server/index.mjs`, with the same files under `Starter/product-explorer/server` for the starting checkpoint.

- `GET /api/health` reports the running API.
- `GET /api/products` returns `items`, `total`, `page` and `pages`, with supported query values applied by the server.
- `GET /api/products/:id` returns one product or a missing-product response.

Use `http://127.0.0.1:4185` for direct API checks; the application at `http://127.0.0.1:5185` uses Vite's `/api` proxy. Keep the browser's bag and delivery choices separate from current API records and local editor drafts.

