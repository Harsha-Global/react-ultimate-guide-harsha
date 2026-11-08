# Prepare Checkout Drafts

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the checkout form checks the contact and delivery details in the browser).
- Completed/product-explorer: shared/checkoutSchema.ts adds the checkout request schema (the checked details plus one to fifty cart lines, each a product id and a whole-number quantity from 1 to 99, one line per product) and the result schema (draft id, subtotal, delivery fee, currency, item quantity). server/index.mjs and server/reset.mjs are the supplied local service with POST /api/checkout-drafts. src/checkoutApi.ts sends the details and the cart as JSON, checks a failed response's message with safeParse, throws a CheckoutError with the status, and returns the result checked by the result schema. src/CheckoutPage.tsx awaits prepareCheckout, resets the form to the submitted values, saves the name, email and note to the shared preferences, stores the result, shows a form-level alert for a rejected request, disables the fieldsets, the summary and the button while the request runs, and shows the last prepared draft's subtotal and delivery fee.
- Supplied Service: the two service files copied into the project's server folder.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).
- Practice/C24 - Build the Checkout Request: a short exercise (Instructions.md, Hints.md, Starter and a separate Solution). Attempt it before opening the solution.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag, open checkout, complete the standard-delivery details (145 Pine Street, Denver, 80202) and choose Prepare checkout: the button shows Preparing checkout and the form waits, then the last prepared draft shows a $79.00 subtotal and a $5.00 delivery fee, and the backpack stays in the bag. Use blocked@example.com: the service rejects the request, the alert says to use another email, and the other details stay in place. No order is placed and no payment is taken.
