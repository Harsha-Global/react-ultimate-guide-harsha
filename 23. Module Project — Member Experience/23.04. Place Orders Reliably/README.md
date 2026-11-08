# Place Orders Reliably

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the checked order request helper and the supplied order service).
- Completed/product-explorer: the same project at the end of the lecture: src/CheckoutPage.tsx places the order: a request ID created once per checkout form (useState with crypto.randomUUID), placeOrder with the checked values, the cart, the request ID and the signed-in user's id, the session version checked after the request and in the catch branch, the form reset, the delivery preferences saved, the confirmed order kept in the result state and the bag cleared only then (clear() from the cart provider); an ended session is expired, an email field error is shown on its field and other failures in the form's alert, with the bag and the details kept; the confirmation (order reference, total, no payment) is returned before the form, and the button reads Placing order... while the request runs. src/CartProvider.tsx adds the cleared action and the clear function. Keep it for the next lecture.
- Service Checks: the supplied service checks (see its README). With the API running, `node check.mjs unavailable` and `node check.mjs available` change and restore the Trail Backpack's availability, and `node check.mjs repeat-order` repeats an accepted request.
- Practice/C32 - Clear the Bag After Success: the coding exercise (Instructions, Hints, the Starter and Solution projects and the solution explanation; see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Sign in as Jordan, add the Trail Backpack to your bag, open checkout, choose Studio pickup and place the practice order: the button reads Placing order..., then the confirmation shows the order reference and $79.00, and Your bag shows 0. Add the backpack again and open checkout. In the Service Checks folder run `node check.mjs unavailable`, then place the order without reloading the page: the API's availability message appears, and the bag and your details stay. Run `node check.mjs available` and place the order again from the same form: it is confirmed. Then run `node check.mjs repeat-order`: PASS, with the same order reference for the repeated request. Always finish with `node check.mjs available`. The orders are kept in the API's memory, so restarting it clears them.
