# Add Server Search & Filters

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files/tests/storefrontQuery.test.mjs: the query and selection tests, copied into the project in the video.
- Practice: the Parse Storefront Query coding exercise (a small TypeScript project, no server, with its own Starter, Solution, README and run guide).
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

The address describes the view: lib/storefrontQuery.ts normalizes the search parameters (q, category and sort; repeated or unknown values fall back to the defaults) and selects products from the received snapshot without changing it; components/StorefrontResults.tsx shows the matching products with a count, the snapshot revision and a Clear filters link for an empty result; the collection and category pages read their searchParams and stream the results inside a keyed Suspense boundary (a category page keeps its own category).

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

Open /catalog?q=studio&sort=price (the lamp, then the headphones) and reload; /categories/workspace?category=Travel stays on Workspace. Try a search without a match (Clear filters), ?category=Unknown and ?q=lamp&q=mug. With `npm run api:slow` a changed query shows Loading your collection…; `npm run api:error` shows the error boundary, not an empty result; run `npm run api:ready` and select Try again. `npm test` runs the query tests. For the coding exercise, open its Starter (in a path without &), run `npm ci`, then `npm test`: 9 of 16 checks pass until readStorefrontQuery is complete. Compare with the Solution (its own `npm ci` and `npm test`) after your attempt.
