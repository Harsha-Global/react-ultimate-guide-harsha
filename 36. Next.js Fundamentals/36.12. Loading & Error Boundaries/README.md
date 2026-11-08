# Loading & Error Boundaries

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Support: the supplied delivery fixture (fixtures/delivery.json), its reader (lib/delivery.ts) and the fixture switch (scripts/delivery-mode.mjs), copied into the project in the video.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A deliberately slow delivery page (app/(learn)/delivery/page.tsx) reading a controllable local fixture on the server, its route loading state (loading.tsx, a status message) and a client error boundary (error.tsx) whose retry recovers after the failure is fixed.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

With the development server running, open /delivery: the loading message appears first, then the delivery details. Run `node scripts/delivery-mode.mjs fail` in a second terminal (from the same folder) and open /delivery again: the error boundary appears with a retry button. Run `node scripts/delivery-mode.mjs ready`, then retry: the page recovers.
