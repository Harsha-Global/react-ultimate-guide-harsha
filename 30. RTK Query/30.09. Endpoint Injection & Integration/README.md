# Endpoint Injection & Integration

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-query: the Order Desk project as completed in the previous lecture.
- Support Files: Route link styles.css, the prepared route-link rules added to src/query.css in the lecture (copy only those rules into the end of src/query.css).
- Completed/order-desk-query: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\order-desk-query) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188 and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North and follow the view links: the address changes to /, /pages, /feed and /live, and the browser's Back and Forward buttons follow it. Open /pages directly after opening North, then an unknown address such as /missing: it returns to /.
