# Build Product Details

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files/components/ProductDetails.tsx: the product details presentation, copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

A full page for each product: readStorefrontProduct(slug) in lib/storefront.ts finds the product in the same catalog snapshot, the dynamic route app/(store)/products/[slug]/page.tsx shows its heading and details (or the not-found page), and the product grid links each card's name to its product page.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

From /catalog or a category page open Studio Desk Lamp: the full page shows the same name, price and stock; reload it. The backpack's page says it is currently unavailable, and /products/missing-slug shows the not-found page. Run `npm run api:error` and reload a valid product page: the error boundary appears; `npm run api:ready` and Try again recover. At a narrow width, Tab to a card link and press Enter.
