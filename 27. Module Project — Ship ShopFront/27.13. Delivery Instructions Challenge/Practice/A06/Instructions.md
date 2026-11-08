# Delivery Instructions

The client asks for an optional delivery instruction, such as “Leave at reception”. Use the existing checkout note input as its draft value. Show it only for standard/express delivery, label it clearly, and keep the typed draft when the customer switches methods. Keep the form’s existing 120-character limit. For pickup, omit the instruction from the fulfillment request even if a draft remains.

Extend only the delivery branch of `fulfillmentSchema` with an optional `instructions` string. A present instruction must trim to 1–120 characters. Map a nonempty validated note into that property; omit an empty value. Keep the existing strict pickup shape. Remove the old `details.note` property from both the outgoing object in `orderApi.ts` and the strict request schema in `orderSchema.ts`. The form still keeps its editable note, but the request sends delivery instructions only inside the selected fulfillment object. The separate saved `order.note` remains the earlier member-note feature. Do not use the member-note field to display delivery instructions.

Display the saved instruction through FulfillmentSummary, so confirmation and history both read the server response. Do not reconstruct it from browser storage after a reload. The supplied order API already saves the validated fulfillment object; inspect that connection before adding unnecessary duplicate server state.

Add focused regression tests for trimmed delivery text, blank omission, pickup omission and invalid requests. Check the actual outgoing request too: it must contain no duplicate `details.note`, and pickup must not send the remembered instruction text. Add a real browser journey that places a delivery order, checks the saved instruction, opens history and reloads it. Keep earlier checks passing. Use sample details only.

Open `Starter/product-explorer`; run npm ci. Suggested 45–60 minutes. Before submission run npm run lint, npm run check:tests, npm run test:run, npm run build, npm run verify:production and npm run test:production. Install Chromium once if needed. Submit your changed source files, the results, a before/after screenshot and the written answers below. Public deployment is optional; local production evidence is sufficient. Do not copy installed/generated folders or private data into the submission.

Try the task before reading the complete `Solution/product-explorer`. The solution is separate from the hosted main release; completing the assignment does not automatically redeploy it.
