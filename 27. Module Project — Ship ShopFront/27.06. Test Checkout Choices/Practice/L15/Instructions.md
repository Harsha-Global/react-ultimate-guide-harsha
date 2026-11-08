# Repair the pickup request

A teammate added the remembered address to every pickup request. The checkout form can retain that address, but the strict pickup contract rejects it. Repair `src/toFulfillment.ts` so each mapped request contains only the fields for the selected choice.

Open `Starter/product-explorer`, run `npm ci`, then `npm run test:run -- tests/fulfillment.test.ts`. Observe the failing valid-pickup case. Make the smallest correction; keep the strict schemas and the tests. Run the focused test, the full suite and `npm run check:tests` afterward.

Acceptance: pickup maps to exactly `{ kind: "pickup", window: "morning" }`; delivery still maps to its method and address without a window; the original editable draft is not mutated. Explain why retaining an address in a hidden form field does not require sending it to the server.

Try the task before opening `Solution/product-explorer`. Expected time: 10–15 minutes. This is a local coding exercise using the project’s Zod dependency; it is not labeled as a native Udemy coding sandbox.
