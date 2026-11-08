# Links & Navigation

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A client Navigation component with Link elements, an active marker from usePathname and one deliberate router action (router.push to a fixed internal path), used by the learning layout in place of the inline links.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Open /catalog directly, then use Story and Catalog and the browser's Back and Forward buttons: the active marker follows the path and the layout counter survives client transitions, but resets on a reload.
