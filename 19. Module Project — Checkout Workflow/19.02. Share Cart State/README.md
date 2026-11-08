# Share Cart State

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the bag is stored by App with useSavedValue).
- Completed/product-explorer: CartProvider.tsx owns the one shared cart: a CartAction union (added, quantityChanged, removed), cartReducer reusing the existing cart helpers, initialCart restoring the saved cart from the same storage key, an effect saving it again, and the useCart hook. main.tsx mounts CartProvider around the router. App.tsx reads the cart with useCart for the header, keeps the delivery preferences in useSavedValue and passes only those through the outlet context; useShop combines both, so the existing screens work unchanged. CheckoutSummary.tsx is the adjustable summary (decrease, increase and remove controls, the empty bag, missing or changed products, the available-item subtotal); CheckoutPage.tsx renders it at /checkout with every product from the existing loader, and the bag page links to it with Review checkout. src/index.css is the supplied stylesheet, with a disabled style for the summary's quantity buttons.
- Designs: the client's change request and the revised checkout design kit (v2): the Figma file to import, plus PDF, PNG and SVG copies of each design.
- Styles: the prepared stylesheet (with the same disabled style for the summary's quantity buttons).
- Practice/C23 - Respect Cart Limits: a short exercise (Instructions.md, Hints.md, Starter and a separate Solution). Attempt it before opening the solution.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag, open Your bag and choose Review checkout. Increase the quantity: the summary shows 2 and $158.00, the header shows 2, and the increase button is disabled at the backpack's limit of 2. Go back to your bag: it shows 2, also after a reload. Decrease to 1 (the decrease button is disabled at 1), then remove the backpack to see the empty bag and its Explore the collection link.
