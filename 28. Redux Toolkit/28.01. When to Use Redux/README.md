# When to Use Redux

The completed application is the exact source demonstrated in the video.

- Completed/order-desk: the supplied Order Desk shell inspected in the lecture (src/orders.ts with the sample records, src/QueueTable.tsx with its local details state and the prepared selection props). It is the starting point of the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy order-desk into your React workspace (for example C:\react\order-desk) and open it in VS Code. In its terminal run `npm ci`, then `npm run dev` and open http://127.0.0.1:5188 (no API server is needed). Stop the server of any earlier copy first (same port). All five orders are sample records: selecting an order does not change a real order or collect money, and the in-memory state resets on reload. Validate with `npm run lint` and `npm run build`.

## Try it

Open Details for Avery's order (OD-1041) and close it again. The selection checkboxes stay disabled until the queue is connected to the store later in this section.
