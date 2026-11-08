# Delivery Instructions Challenge

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer and Completed/product-explorer: the released ShopFront project (this lecture changes no project files).
- Practice/A06: the Delivery Instructions assignment: Instructions.md (the client request and what to submit), Rubric.md, Questions and Answers.json (the written questions with model answers), Starter/product-explorer (open it and run `npm ci`) and Solution/product-explorer (the complete solution, reviewed in the next lecture; try the task first).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`. Run the tests with `npm run test:run` and check their TypeScript with `npm run check:tests`.

## Try it

In Practice/A06/Starter/product-explorer: add the optional delivery instruction (shown only for standard or express delivery, its draft kept when switching methods, at most 120 characters), carry it only in the delivery branch of the fulfillment object (omitted when empty; pickup rejects it; no details.note in the request), show the saved instruction through FulfillmentSummary on the confirmation and in history, and add focused tests plus a browser journey that reloads the history. Then run `npm run lint`, `npm run check:tests`, `npm run test:run`, `npm run build`, `npm run verify:production` and `npm run test:production`.
