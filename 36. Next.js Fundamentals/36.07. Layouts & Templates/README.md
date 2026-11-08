# Layouts & Templates

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A small client VisitCounter component, used twice: once in the learning layout (with Home, Catalog and Story links) and once in a new template.tsx around the selected page.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Increase both counters, then move between Catalog and Story with the links: the layout counter keeps its value, the template counter starts again for each page. A full reload resets both.
