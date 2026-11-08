# Keep Order Views Current

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-module: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared tests tests/live-views.test.ts and tests/status-editor.test.tsx copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-module: the project at the end of this lecture. Keep it for the next lecture.
- Live Bug/Stale Queue: separate copies of the project with the stale-queue bug (Faulty) and with the fix (Fixed); run either with its own `npm ci` after stopping other copies.

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188, choose Operator as the demo role and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North, wait for live updates and open OD-1041. Change the first order on the server with the local demo controls: the queue and the detail show the new status. Close live updates and change it again (the views stay), then open live updates: both refresh.
