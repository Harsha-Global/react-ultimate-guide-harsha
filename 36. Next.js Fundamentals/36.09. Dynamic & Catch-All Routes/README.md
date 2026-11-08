# Dynamic & Catch-All Routes

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Practice: an exercise on validating the optional catch-all help route.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A dynamic product route (app/(learn)/products/[slug]/page.tsx) with the reusable ProductDetails presenter, catalog links by slug, and an optional catch-all help route (help/[[...parts]]) backed by an allowlist in lib/help.ts.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Open /products/desk-lamp and /products/desk-tray, then /products/missing (not found). Try /help, /help/delivery and /help/delivery/times, then /help/delivery/unknown and /help/toString (not found).
