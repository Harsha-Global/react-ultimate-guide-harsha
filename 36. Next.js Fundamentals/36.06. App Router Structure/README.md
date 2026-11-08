# App Router Structure

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Support/lib/products.ts: the supplied catalog records and helpers, copied into the project in the video.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

The home page moved into the (learn) route group with its own learning layout, a catalog page listing the four products from lib/products.ts, a story page and the app-wide not-found page. The route group organizes files without adding a word to the address.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Visit / , /catalog and /story directly: each shows its page inside the shared learning layout. Visit /missing: the not-found page appears. /(learn)/catalog is not an address.
