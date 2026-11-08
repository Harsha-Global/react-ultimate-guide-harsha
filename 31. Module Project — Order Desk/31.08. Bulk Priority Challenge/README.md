# Bulk Priority Challenge

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-module and Completed/order-desk-module: the continuing Order Desk project, unchanged in this lecture (the assignment is a separate project). Keep it for the next lecture.
- Resources/Client Design Kit: the client's design kit: the revised native Figma file with the bulk-priority frames (Order Desk - Design Kit.fig; import it into your Figma Drafts with More › Import), PDF and PNG references of the same frames, the SVG frames and the Manrope/DM Sans fonts with their licenses (see its README).
- Practice: the Bulk Order Priority assignment (Instructions, API Contract, Starter, Solution).

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188, choose Operator as the demo role and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

In the assignment's Starter/order-desk (Practice folder) run `npm ci`, `npm run api` and `npm run dev`, choose Operator and open North, then follow Instructions.md. `npm run test:run -- tests/bulk-priority.test.tsx` fails the update tests until the task is complete.
