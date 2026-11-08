# Build the Public Catalog

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files: the catalog types, contract and reader (lib), the contract test (tests), the sample catalog API and its fixture switch (scripts), the fixture data (data), the product grid (components/ProductGrid.tsx) and the store error boundary (app/(store)/error.tsx), copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

The public collection: package.json gains the scripts that start and switch the local sample API; lib/storefront.ts (server-only) exposes readStorefront over the supplied catalog reader; a StorefrontHeading hero with a preloaded image; the /catalog page (app/(store)/catalog/page.tsx) reads the catalog on the server and shows the product grid or an explicit empty message, with the supplied error boundary for a failed request; the header gains a Collection link (prefetch off) and the home page an Explore the collection link.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

With both processes running, open http://localhost:3000 and choose Explore the collection: /catalog shows the four products (the backpack is currently unavailable). Run `npm run api:slow` and reload (Loading this page… appears first), then `npm run api:error` and reload (the error boundary offers Try again); run `npm run api:ready`, select Try again, and finish with `npm run api:reset`. Check a narrow and a desktop width.
