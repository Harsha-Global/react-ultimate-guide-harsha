# Add Metadata & Assets

The completed application is the exact source demonstrated in the video.

- Starter/shopfront-next: the ShopFront app as completed in the previous lecture.
- Support Files: the site address helper (lib/site.ts), the product schema helper (lib/productSchema.ts) and its tests (tests/productSchema.test.mjs), and the crawl instructions (app/robots.ts), copied into the project in the video.
- Completed/shopfront-next: the app at the end of this lecture. Keep it for the next lecture.

Metadata from the same data the pages show: the root metadata (metadataBase from the site address, a title template, a description); generateMetadata for the collection (canonical /catalog, noindex for filtered views), each category (title, canonical address, noindex for searched or sorted views) and each product (title, description, canonical address, Open Graph image); a noindex shortlist layout; the product's JSON-LD (productSchema with safeJsonLd) on the full product page; and a sitemap of the public addresses (app/sitemap.ts). The images and fonts already load through next/image and next/font/local.

## Run

Copy the shopfront-next folder into your React workspace (for example C:\react\shopfront-next; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture shows the local inventory editor on the collection when the site is opened on this computer; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000 (the npm scripts bind 127.0.0.1; keep using localhost, as 127.0.0.1 is a different browser-storage origin for the shortlist). Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in a third terminal in the same folder as the running API. To check a production build, stop the development server with Ctrl+C (keep the API running: the build reads the catalog from it), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`. Finish with `npm run api:reset` and stop both processes.

## Try it

After `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`, open /products/studio-desk-lamp directly: the title is Studio Desk Lamp | ShopFront, and the canonical link and the JSON-LD match the visible name, price and stock. Compare /catalog (indexed) with /catalog?q=studio (noindex, follow); /shortlist and /products/missing carry noindex. Open /sitemap.xml and /robots.txt, and check the fonts and images at desktop and narrow widths. Set SITE_URL to the real public address before any deployment.
