# Read Search Parameters

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

lib/catalogQuery.ts accepts only a bounded q text and the price sort; the catalog page awaits its searchParams once, parses them and derives the visible list, its count and the applied summary.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Visit /catalog, /catalog?q=desk&sort=price (the desk tray before the lamp), /catalog?q=zzzz (no matches) and /catalog?q=desk&q=wall&sort=unexpected (repeated q and an unknown sort fall back to the defaults).
