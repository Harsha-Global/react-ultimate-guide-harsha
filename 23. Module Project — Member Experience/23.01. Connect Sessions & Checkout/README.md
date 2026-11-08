# Connect Sessions & Checkout

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the member starter: the ShopFront catalog, bag and checkout from the previous section, with the supplied session files (src/Auth.tsx, src/AuthForm.tsx, src/Guards.tsx, src/LoginPage.tsx, src/SignOutButton.tsx, src/safeReturnTo.ts, src/sessionApi.ts) and the local API with its practice accounts.
- Completed/product-explorer: the same project at the end of the lecture: src/main.tsx wraps CartProvider and the router in AuthProvider; src/App.tsx shows the account control (Sign out when signed in, otherwise a Sign in link); src/router.tsx adds the login route and puts checkout inside a pathless RequireSession route; src/checkoutApi.ts sends the session's write header (X-CSRF-Token) with the checkout request. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Add the Trail Backpack to your bag and choose Review checkout while signed out: the sign-in page opens with returnTo=%2Fcheckout. Sign in as Jordan: you return to checkout with the backpack still in your bag. Reload the page: it waits for the session check and shows checkout again. Stop the API (Ctrl+C in its terminal) and reload: the page cannot check the session. Restart the API and choose Try again: We couldn't check your session, with Try again; choose it once more: the restarted service has no saved session, so the sign-in page opens with the return destination kept.
