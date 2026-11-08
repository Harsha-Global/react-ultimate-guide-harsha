# Local verification helpers

Copy this verification-resources folder to C:\react\verification-resources, alongside C:\react\shopfront-next. Keep the application's private .env in shopfront-next and install that application's dependencies with npm ci.

These are the exact helper files used in the recorded local rehearsal. They require a loopback shopfront_dev database and a Stripe sandbox secret. They do not accept a hosted database or live Stripe key.

From the application terminal, inspect your own freshly paid sandbox order:

    node ../verification-resources/inspect-order.mjs <your-order-id>

This compares stored order, event, outbox and receipt state with the actual Stripe sandbox checkout session. Amounts printed as minor units must be interpreted accordingly.

After the receipt is complete, replay that order's actual sandbox checkout.session.completed event locally:

    node ../verification-resources/replay-event.mjs <your-event-id>

Keep the local release application running on http://localhost:3000 and use its current local webhook signing secret. The helper fetches the actual sandbox event, signs a controlled local replay, posts it to the local webhook and requires the order, inbox, outbox and receipt rows to remain unchanged. This is not a provider dashboard resend or proof of hosted delivery.

Do not reuse the video's order/event identifiers. Record your own observations in a copy of verification-results-template.txt. Keep credentials, private logs and provider account data out of submissions.
