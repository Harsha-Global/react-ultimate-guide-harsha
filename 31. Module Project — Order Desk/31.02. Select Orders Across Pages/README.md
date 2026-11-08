# Select Orders Across Pages

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-module: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared tests tests/selectors.test.ts, tests/memoization.test.ts, tests/checklist.test.ts and tests/workflows.test.tsx (replacing the earlier versions) copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-module: the project at the end of this lecture. Keep it for the next lecture.
- Practice: the Select Eligible Orders coding exercise (Instructions, Starter, Solution).

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188 and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North, clear the selection and choose the Page view. Select the ready orders of page 1 twice: only OD-1041 is selected. On the next page select them again: OD-1043 is added (one on this page, two in total); go back: OD-1041 is still checked.
