# A19 — Live Readiness Summary

Build a live Packing readiness summary for the Order Desk project. Allow about 30–45 minutes. Use the independent Starter/order-desk and leave the guided main checkpoint unchanged.

Inject a getReadyOrders endpoint into the existing baseApi. GET /api/orders?status=ready returns the ready records for the current demo workspace. Validate the response with readOrders, display the returned count and provide the collection tag used by the existing update mutation. Show an initial loading message, a useful service error and a Refresh readiness button. Preserve the latest successful count during a background retry. Zero ready orders is a valid result. Keep all order records in the query cache; do not add a second Redux slice or useState copy.

Render the summary inside SessionGate. A sign-out or workspace change must hide and clear the earlier private result through the existing session-boundary workflow. Preferences may remain. Starting from a fresh API, North has 3 ready orders; shipping OD-1041 should reduce the summary to 2 after the mutation completes. Switching to South must show only South's result. Run npm run build, npm run check:tests, npm run lint and npm run test:run. The five assignment checks deliberately fail until the feature exists.

Find the full Starter and Solution through How to Download Source Code, at 30. RTK Query/Query Testing & Selection/Practice/A19 - Live Readiness Summary. In the selected order-desk folder, run npm ci, then npm run api and npm run dev in separate terminals. Stop your earlier owned processes on 5188/5189 first and open http://127.0.0.1:5188. The supplied local demo needs no account or payment. Compare the Solution after attempting the task.

Manual/self-review rubric (10 points): correct shared API endpoint and runtime contract: 2; valid loading/error/zero/retry interface: 2; invalidation after accepted status changes: 2; private session boundary: 2; passing checks plus reproducible evidence: 2. Udemy does not automatically grade the project or this rubric.
