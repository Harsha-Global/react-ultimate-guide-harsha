# Server Data Fetching

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the basic Catalog Lab setup (package, TypeScript settings, Next.js configuration, root layout, home page and stylesheet).
- Support Files: the sample catalog API and its fixture switch (scripts), the catalog data and contract (data, lib), the contract test (tests), the data workshop error boundary (app/data-lab/error.tsx) and the product images (public/assets), copied into the project in the video.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

A server-side catalog read (lib/catalogApi.ts: an absolute fetch with no-store, a status check and contract validation), the product grid and data catalog components, and the /data-lab route with its Suspense boundary and the supplied error boundary; the root layout links to the data lab, and package.json gains the scripts that start and switch the sample API.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

With both processes running, open /data-lab: the four sample products appear. Run `npm run api:slow` and reload (the loading state shows first), then `npm run api:error` and reload (the error boundary offers Try again); run `npm run api:ready`, select Try again, and finish with `npm run api:reset`.
