# Cancellation & Request Identity

The completed application is the exact source demonstrated in the video.

- Starter/order-desk: the Order Desk project as completed in the previous lecture.
- Completed/order-desk: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the Stale Request Results coding exercise (Instructions, Starter, Solution).

## Run

Copy the project into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`. Start the local preview service with `npm run api` (port 5189) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188. Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Start a preview and click Cancel preview while it is pending (no alert). Start another, add a second ready order and prepare again before it finishes: only the two-order result appears.
