# Build the Checkout Request

Complete buildCheckoutRequest in exercise.ts. Allow about 10 minutes.

The form has already produced validated CheckoutValues. The cart argument contains the current shared cart, not an old form default. Build the options for the checkout-draft request taught in the Prepare Checkout Drafts lecture.

Return an object with exactly these properties: method: "POST"; headers: { "Content-Type": "application/json" }; and body: JSON.stringify({ details, cart }). Keep the details and cart as separate properties in the JSON body. Preserve the supplied nested contact/address values, delivery method, note and every current cart line. Do not hard-code sample values, empty the cart, calculate prices or place an order.

Do not mutate either argument. The helper only builds request options; it does not call fetch. The caller uses these options with /api/checkout-drafts. Server-side validation and authoritative totals remain the server's responsibility.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 19. Module Project — Checkout Workflow/Prepare Checkout Drafts/Practice/C24 - Build the Checkout Request. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
