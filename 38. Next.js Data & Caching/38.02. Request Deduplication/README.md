# Request Deduplication

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Support Files: the stock response validator (lib/stockContract.ts) and the request timing script (scripts/compare-requests.mjs), copied into the project in the video.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

readCatalog wrapped in React's cache, so the data catalog and the new summary share one catalog read per server request, and a catalog summary (components/CatalogSummary.tsx) that starts the catalog and stock reads together (Promise.all), rendered in its own Suspense boundary.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production, note http://127.0.0.1:5211/metrics, open /data-lab once and check it again: one catalog read and one stock read for the page request. With `npm run api:slow`, `node scripts/compare-requests.mjs` compares sequential and parallel timings; run `npm run api:ready` afterwards.
