# Typed React Redux Hooks

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared test tests/connected.test.tsx copied into the project in the lecture. Copy the folder's contents into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk: the project at the end of this lecture (the queue checkboxes, the ready-only filter and the selection summary share one store). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy order-desk into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev` and open http://127.0.0.1:5188 (no API server is needed). Stop the server of any earlier copy first (same port). All five orders are sample records: selecting an order does not change a real order or collect money, and the in-memory state resets on reload. Validate with `npm run lint` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Select OD-1042, turn on the ready-only filter (the selection is kept), clear the selection and turn the filter off. Run `npm run test:run -- tests/connected.test.tsx`.
