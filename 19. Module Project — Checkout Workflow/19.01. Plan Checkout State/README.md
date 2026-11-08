# Plan Checkout State

This lecture plans the checkout work; the project is used exactly as supplied, with no code changes.

- Starter/product-explorer: the supplied ShopFront project (shareable catalog filters and pagination, product pages, the bag and delivery preferences saved in the browser, and the inventory editor), with the form and query packages used in this milestone already installed by npm ci.
- Designs: the client's checkout brief (Client Brief.md) and the original checkout design kit (v1): the Figma file to import, plus PDF, PNG and SVG copies of the desktop and mobile checkout, the inventory editor and the validation, pending and recovery states.
- Styles: the prepared stylesheet (already in the project's src/index.css).

## Run

Copy product-explorer into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health (the response contains "ok": true). In a second terminal run `npm run dev` and open http://localhost:5185. Open Trail Backpack, choose Add to bag, then open Your bag. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Design

In Figma's file browser, choose Import and select Designs/v1/ShopFront Checkout Design Kit.fig. Open the imported file and select the page "v1 - Original client brief": Desktop - Checkout, Mobile - Checkout, the inventory-editor designs and the validation, pending and recovery states.
