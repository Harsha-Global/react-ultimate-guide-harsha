# Supplied local service checks

Start this lecture’s service on port 4185. These Node.js 24 checks use isolated demo sessions; they do not sign the browser out. Run each command from this folder.

```sh
node check.mjs permissions
```

From the lecture that places practice orders onward, add p1 (Trail Backpack) to the browser bag and open checkout while it is available. Fill the form before changing availability:

```sh
node check.mjs unavailable
```

Without reloading checkout, submit. Expect an availability message, the same bag and the same entered details. Restore availability, then retry:

```sh
node check.mjs available
node check.mjs repeat-order
```

The repeat-order check submits a separate valid practice order twice with one request ID, and checks both responses refer to the same saved order. It creates one order in Jordan’s local history. Availability changes are local catalog edits. The `available` command restores p1’s seeded two-item limit. Always finish with `available`; do not change files or restart the service during a pending request. No real payment or stock reservation occurs.

## Browser session expiry

Open http://127.0.0.1:5185/session-check.html in a second tab, while signed in to ShopFront. Click **Expire this browser session**. Return to order history and trigger its next request after the one-minute fresh period. For the order-note assignment, saving a note immediately makes a private request. Verify the sign-in screen appears and private orders are hidden. This supplied page only changes the local practice session; it does not restart the service or clear its saved orders.
