# Review Release Requirements

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the completed member-experience ShopFront project, as supplied for this section.
- Completed/product-explorer: the same project at the end of the lecture (unchanged: this lecture reads the existing flow and defines the release requirement). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. Stop the servers of any earlier copy first (same ports). Sign in at checkout with the sample member jordan@example.com and the password PracticeOnly42! (rebecca@example.com is the staff account). The local API keeps sessions and orders in memory (restarting it clears them); these are no-payment practice orders, and a pickup window does not reserve a real appointment. Validate with `npm run lint`, `npm run check` and `npm run build`.

## Try it

Browse the collection, add the Trail Backpack to your bag, open the bag and choose Review checkout. Sign in as Jordan: you return to checkout with the same bag. Then follow the order flow in the source: src/router.tsx (the checkout and orders routes inside the session guard), src/App.tsx (useShop: the cart context and delivery details passed through the outlet) and src/CheckoutPage.tsx (submit: the awaited placeOrder, the account check, then clearing the bag). The release adds a pickup choice with a morning (10 am–12 pm) or afternoon (2–4 pm) collection window, sends only the selected choice, and shows the saved choice in the confirmation and order history.
