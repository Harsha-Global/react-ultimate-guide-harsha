# Mutations & Server Validation

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-query: the Order Desk project as completed in the previous lecture.
- Completed/order-desk-query: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\order-desk-query) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188 and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North (fresh sample data: restart `npm run api`), open OD-1041 and save Shipped: the service accepts it as version 2 and the queue and detail agree. On OD-1042 (payment pending) save Shipped: the service rejects it with its validation message and the order stays payment pending.
