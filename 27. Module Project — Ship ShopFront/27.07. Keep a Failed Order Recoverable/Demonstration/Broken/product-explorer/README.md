# Intentional early-clear bug — isolated demonstration

This separate source clears the shopping bag before the order response. It is deliberately incorrect. Keep the guided main unchanged. Use only local sample data.

From this project folder, install with `npm ci`, then run `npm run test:run -- tests/checkout-recovery.test.tsx`. The retained two-item assertion fails. Compare `src/CheckoutPage.tsx` with the guided main project, where clear follows the accepted response and current-account check. Run the same test in the main project and confirm it passes. Do not deploy this broken project.
