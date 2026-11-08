# Optimistic Cache Updates

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-query: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared helper src/services/mutationGroups.ts copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-query: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the RTK Query Updates assignment (Instructions, Starter, Solution).

## Run

Copy the project into your React workspace (for example C:\react\order-desk-query) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188 and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North (fresh sample data), open OD-1041 and save Shipped: the detail changes at once while Saving shows and the version stays 1, then version 2 arrives. On OD-1042 the rejected proposal returns to payment pending with the alert.
