# Queries & Cache Identity

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-query: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared test tests/connected.test.tsx copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-query: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\order-desk-query) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188. Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Select OD-1042, search for Avery (one row; the selection stays), clear the search, then search for a name that doesn't exist (the empty-state message).
