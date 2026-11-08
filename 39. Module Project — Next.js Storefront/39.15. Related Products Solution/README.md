# Related Products Solution

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the Related Products assignment's Starter (the finished ShopFront app with the selector stub and its tests), the starting point of the solution.
- Practice Starter/shopfront-next: the same assignment Starter, as supplied with the lecture.
- Completed/shopfront-next-related-products: the assignment copy at the end of this lecture (the solution). The guided project continues from the completed app of Deploy the Public Storefront.

The Related Products solution, written in a separate copy of the assignment Starter: selectRelatedProducts (lib/relatedProducts.ts) finds the current product, keeps each available product once (a Set of seen IDs), puts same-category products first and returns at most two, without changing its input; the route app/(store)/products/[slug]/related/page.tsx reads one catalog snapshot, shows the related products or an explicit empty message, and describes itself with generateMetadata (title and canonical path); the full product page links to it (Explore related products, prefetch off).

## Run

Copy the shopfront-next-related-products folder into your React workspace (for example C:\react\shopfront-next-related-products; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost, as 127.0.0.1 is a different browser-storage origin for the shortlist). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

Open /products/studio-desk-lamp and choose Explore related products: the mug and the headphones appear (the backpack is unavailable); reload. /products/missing-product/related shows the not-found page. `node --test tests/related.test.mjs` runs the 8 selector tests, `npm test` all 36. For the empty and outage checks use the Uncached Recovery Check supplied with the assignment (Related Products Challenge, Practice): with its own install, API and app, run `node scripts/api-mode.mjs stock P-103 0` and `node scripts/api-mode.mjs stock P-104 0`, reload the lamp's related page (No other products are currently available.), then `npm run api:reset`; `npm run api:error`, reload, `npm run api:ready` and Try again recover.
