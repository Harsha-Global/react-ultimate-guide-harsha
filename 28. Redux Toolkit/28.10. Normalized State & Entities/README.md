# Normalized State & Entities

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared test tests/checklist.test.ts copied into the project in the lecture. Copy the folder's contents into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk: the project at the end of this lecture. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy the project into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`. Then run `npm run dev`; open http://127.0.0.1:5188. Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Run `npm run test:run -- tests/checklist.test.ts` (add, toggle, remove and a missing ID). The screen is unchanged; the checklist appears in the next lecture.
