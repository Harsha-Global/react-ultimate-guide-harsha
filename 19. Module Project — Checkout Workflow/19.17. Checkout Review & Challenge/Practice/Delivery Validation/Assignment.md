# Delivery Validation

The delivery team now offers express delivery only for five-digit ZIP codes starting with `802`. Express delivery also needs a ten-digit phone number. Add these related-field rules to the supplied checkout without changing the standard-delivery or pickup behavior.

This is a local coding assignment with manual self-review. Try the starter before opening the complete solution. Use sample contact details. This demo prepares a local checkout draft; it does not place an order or take payment.

## Start

Open `Starter/product-explorer`. Run the command `npm ci`. In separate terminals, run the command `npm run api` and the command `npm run dev`. The API uses port 4185 and the app uses port 5185; stop an older copy first. The command `npm run api:reset` restores the six seed products and normal timing. Add the Trail Backpack to your bag, then open Checkout.

## Acceptance criteria

- Express: require a ten-digit phone number and a five-digit ZIP starting with 802. Show each failure beside its own field with a clear explanation.
- Standard: phone remains optional; any five-digit ZIP is accepted. A supplied phone still needs ten digits.
- Pickup: no address is required; phone remains optional. Preserve the existing maximum-length and supplied-phone rules.
- Keep the shared Zod schema as the client and supplied API contract. A direct invalid API request must also fail. Do not trust a browser-only check.
- Make the phone label and delivery helper explain the selected method. Connect helper/error text to the field and preserve first-invalid-field focus.
- After an attempted submission, changing the method must update dependent errors without another submission. Retain the entered details.
- Keep pending controls, server rejection, retry, cart totals and the successful saved baseline working. `blocked@example.com` must still show the supplied 409 rejection without clearing the draft.
- Check desktop and 390px layouts; run the command `npm run lint`, then the command `npm run build`.

## Suggested checks

Use Taylor Morgan, taylor@example.com, 210 Market Street, Denver and one Trail Backpack. Express with empty phone and ZIP 10001 must show both errors; phone 3035550148 with ZIP 80202 must prepare a draft with subtotal 79 and delivery 12. Standard with empty phone and ZIP 10001 must succeed with delivery 5. Pickup with empty address and phone must succeed with delivery 0. An invalid supplied phone is rejected for every method. After a failed express attempt, switch to Standard or Pickup and check that express-only errors clear. Switch back to Express and check they return where necessary. Finally, test blocked@example.com, correct it, and retry.

## Self-review — 10 points

Cross-field contract and shared API enforcement: 4. Useful field messages, labels and focus: 2. Method-change revalidation and retained input: 2. Success, rejection/retry and cart/layout regression: 2. A successful build alone does not earn behavior points.

Submit a short explanation of your rule placement, dependent-field behavior and observed checks in the three Udemy response fields. Compare with `Solution/product-explorer` and `Review.md` after attempting the task. Full source follows the course repository route.
