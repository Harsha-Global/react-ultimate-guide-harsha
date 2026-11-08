# Update Search Parameters

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A client CatalogFilters form that writes only its own q and sort values into a copy of the current search parameters, pushes the result with a transition, shows pending feedback, and is keyed by the applied values so Back restores its fields.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Apply desk with price sorting, then wall: Back restores desk and the select. Reload the same address. Add &campaign=spring by hand and apply a search: campaign stays in the address. Clear the search to remove q.
