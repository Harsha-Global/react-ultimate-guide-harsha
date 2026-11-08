# Run the project

Use Node.js 22.22.0 or later. Open either `Starter/product-explorer` to follow along,
or `product-explorer` for the completed example. Install the pinned dependencies:

```sh
npm ci
npm run api
```

Leave that terminal running. In another terminal, from the same project folder:

```sh
npm run dev
```

Open http://127.0.0.1:5185. The local API uses port 4185; Vite proxies `/api` to it.
Stop an earlier course copy on these ports before switching projects. The first
dependency installation needs internet access. Fonts and product images are local.

Verify source with `npm run check`, `npm run lint` and `npm run build`.
The inherited Fast Refresh notices in App.tsx and DeliveryPreferences.tsx do not
prevent the TypeScript check or production build.

Practice deletion from Inventory. Open the backpack confirmation and choose Keep
product; the row and count remain. Confirm deletion and wait through Deleting…;
the row disappears and the count becomes five while the address stays on Inventory.
Visit the old product address to see its missing-product view. A saved bag containing
that id shows an unavailable item and excludes it from the available-item subtotal.

Restore the six seed products and normal timing with `npm run api:reset`.
This leaves browser bag and delivery preferences intact. API changes persist in
generated `server/data.json`; a server restart alone does not restore the seed data.
Use sample contact details only; this local practice app places no order.
