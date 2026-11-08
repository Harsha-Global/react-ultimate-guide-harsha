# Save Workspace Preferences

The completed application is the exact source demonstrated in the video.

- Starter/order-desk-module: the Order Desk project as completed in the previous lecture.
- Support Files: the prepared tests tests/workflows.test.tsx (replacing the earlier version) and tests/preferences-v2.test.ts copied into the project in the lecture. Copy the contents of Support Files/order-desk into your project folder (where package.json is), keeping the folder structure.
- Completed/order-desk-module: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\order-desk-module) and open it in VS Code. In its terminal run `npm ci`. Start the order service with `npm run api` (port 5189, health check http://127.0.0.1:5189/api/health) and, in a second terminal, `npm run dev`; open http://127.0.0.1:5188, choose Operator as the demo role and open North or South (a local demo session; no real account). Stop the servers of any earlier copy first (same ports). All orders are sample records: no real order or payment changes. Validate with `npm run lint` and `npm run build`; run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

Open North and choose Ready to pack as the default filter in Workspace preferences: "Saved on this browser" appears and the current queue stays on All statuses. Reload and open North: the queue starts with Ready to pack. Reset preferences restores All statuses and comfortable rows.
