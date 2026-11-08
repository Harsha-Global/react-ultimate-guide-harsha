# Public Pages & Metadata

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

A public catalog page (app/catalog/page.tsx) and a page per product (app/products/[slug]/page.tsx with components/ProductDetails.tsx and app/products/not-found.tsx) linked from the grid and the root layout; the site address helper (lib/site.ts: SITE_URL with a localhost fallback), the root metadata (metadataBase, a title template, a description), the catalog's metadata, generateMetadata for each product (title, description, canonical address, Open Graph image) and a noindex data workshop layout.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture enables the local stock form; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production open /catalog, then Studio Desk Lamp: the document title, description, canonical link and og:image describe that product. /products/missing shows the not-found page with noindex, and /data-lab carries noindex. Set SITE_URL to the real public origin before any deployment.
