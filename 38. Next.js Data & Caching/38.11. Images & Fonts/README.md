# Images & Fonts

The completed application is the exact source demonstrated in the video.

- Starter/catalog-lab: the Catalog Lab app as completed in the previous lecture.
- Support Files: the licensed Manrope and DM Sans font files with their licenses and sources (public/fonts), copied into the project in the video.
- Completed/catalog-lab: the app at the end of this lecture. Keep it for the next lecture.

Product images through next/image (sizes for the catalog cards, a preloaded hero on the product page) and the two supplied fonts through next/font/local (CSS variables used by the stylesheet), with no runtime request to an external font service.

## Run

Copy the catalog-lab folder into your React workspace (for example C:\react\catalog-lab; no folder anywhere in the path may contain the & character) and open it in VS Code. Stop any other app using ports 3000 or 5211 first. In a first terminal run `npm ci` (the first installation needs registry access), then `npm run api:reset` and `npm run api`: the local sample catalog API listens on http://127.0.0.1:5211 (http://127.0.0.1:5211/health reports its status). Copy .env.local.example to .env.local (COURSE_ALLOW_WRITES=local-fixture enables the local stock form; it is a teaching switch, not authentication, and never belongs on a public deployment). In a second terminal run `npm run dev -- --port 3000` and open http://localhost:3000/data-lab. Run the fixture commands (`npm run api:slow`, `npm run api:error`, `npm run api:ready`, `npm run api:reset`) in the same folder as the running API. To check the server cache, stop the development server with Ctrl+C (keep the API running), then run `npm test`, `npm run typecheck`, `npm run build` and `npm start -- --port 3000`: development reloads are not evidence of cache reuse. Finish with `npm run api:reset` and stop both processes.

## Try it

In production open /catalog and a product page at desktop and mobile widths: the images load in suitable sizes, and the headings and text use the supplied fonts.
