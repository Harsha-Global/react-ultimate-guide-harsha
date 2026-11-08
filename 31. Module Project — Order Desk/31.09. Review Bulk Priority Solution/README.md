# Review Bulk Priority Solution

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-module and Completed/order-desk-module: the continuing Order Desk project, unchanged in this lecture (the assignment is a separate project). Keep it for the next section.
- Solution/order-desk: the reviewed solution of the Bulk Order Priority assignment, a separate project (run it with its own `npm ci` after stopping other copies).

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188, choose Operator as the demo role and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

In Solution/order-desk run `npm ci`, `npm run api` and `npm run dev`; choose Operator and open North (fresh sample data), select OD-1041 and OD-1042, review them and apply high priority: OD-1041 is accepted, the payment-pending OD-1042 is rejected and stays selected. `npm run test:run -- tests/bulk-priority.test.tsx`: the three tests pass.
