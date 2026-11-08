# Add Retryable Order Notes

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the page components loaded by their routes).
- Completed/product-explorer: the same project at the end of the lecture: unchanged in this lecture: the guided project stays as it was, so the optional order-note assignment is not a prerequisite for the next section. Keep it for the next lecture.
- Practice/A05: the retryable order-note assignment (Assignment.md with its acceptance checks, Rubric.md, the Starter and Solution projects and the solution explanation; see its README). Attempt it in Starter/product-explorer first and compare with Solution/product-explorer afterwards. Each is a complete application on the same ports, so stop the main app and API before running one.
- Service Checks: the supplied service checks (see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Review the member journey in the Completed project: browse the collection, add the Trail Backpack to your bag, open the bag and choose Review checkout. Sign in as Jordan: you return to checkout with the same bag. Choose Studio pickup, place the practice order and choose View my orders. Sign out and sign in as Rebecca: No orders yet, and the Inventory link is available. For the assignment, open Practice/A05, read Assignment.md and follow its Start and check steps in Starter/product-explorer (`npm ci`, `npm run api`, `npm run dev`). The supplied service rejects the first attempt with the sample note Please leave with Jordan before saving it, so you can check that the draft survives the failure and that the retry saves it beside the correct order.
