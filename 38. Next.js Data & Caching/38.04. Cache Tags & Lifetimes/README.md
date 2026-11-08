# Cache Tags & Lifetimes

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

The cached catalog reader with a category argument, the shared catalog tag (catalogTag with cacheTag) and an explicit lifetime (cacheLife with stale 30, revalidate 60 and expire 300 seconds), and a cached Workspace projection (components/CachedCategory.tsx) on the data workshop.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production, /data-lab shows the All and Workspace results with their snapshot revision; the API terminal shows a separate read for each cache key.
