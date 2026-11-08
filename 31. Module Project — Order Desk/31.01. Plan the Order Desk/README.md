# Plan the Order Desk

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the completed RTK Query project of the previous section; copy it into a new folder (for example C:\react\order-desk-module) as in the lecture.
- Support Files: the prepared stylesheet src/module.css copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-module: the project at the end of this lecture. Keep it for the next lecture.
- Client Brief.md: the client's requests for this module, opened in the lecture.
- Resources/Client Design Kit: the client's design kit: the native Figma file (Order Desk - Guided v1.fig; import it into your Figma Drafts with More › Import), PDF and PNG references of the same frames, the SVG frames and the Manrope/DM Sans fonts with their licenses (see its README).

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188 and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North: the refreshed workspace keeps the search, page, detail and live views. Select OD-1041 in the search view, then go to the next page in the Page view: the selected count stays 1. Client Brief.md lists the requests the next lectures implement.
