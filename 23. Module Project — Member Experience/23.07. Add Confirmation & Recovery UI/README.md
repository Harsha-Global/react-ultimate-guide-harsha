# Add Confirmation & Recovery UI

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as completed in the previous lecture (the private order history).
- Completed/product-explorer: the same project at the end of the lecture: src/OrderConfirmation.tsx shows the confirmed order (reference, total, no payment, View my orders) with a Delivery information button and its local open state; its DeliveryDialog is a native modal dialog (useRef for the element, useId for the heading named by aria-labelledby, showModal in an effect whose cleanup closes the dialog and returns focus, onCancel for Escape, the close button with autoFocus) and loads the delivery help lazily: lazy(() => import("./DeliveryHelp")) inside Suspense (Loading delivery information...) inside the ErrorBoundary (Delivery help is unavailable. Your order is still confirmed.), with the close button outside the boundary; src/DeliveryHelp.tsx is the delivery information; src/ErrorBoundary.tsx is the supplied error boundary; src/CheckoutPage.tsx renders <OrderConfirmation order={result} />. Keep it for the next lecture.
- Supplied/Error boundary/ErrorBoundary.tsx: the supplied error boundary, already in product-explorer/src in the Completed project; copy it into src when you start from the Starter.
- Demonstrations/Optional help failure/product-explorer: the separate copy used in the video, whose DeliveryHelp throws while rendering (see its README). Copy it to C:\react\product-explorer-resources\Demonstrations\Optional help failure\product-explorer, stop the main app and API, then run `npm ci`, `npm run api` and, in a second terminal, `npm run dev` there.
- Service Checks: the supplied service checks (see its README).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy product-explorer into your React workspace (for example C:\react\product-explorer) and open it in VS Code. In its terminal run `npm ci`, then `npm run api` (the local API on port 4185). In a second terminal in the same folder run `npm run dev` and open http://127.0.0.1:5185; keep the same hostname throughout the session. The practice accounts are in product-explorer/README.md: Jordan is a customer and Rebecca is staff. The local API keeps sessions and orders in memory (restarting it clears them); no real payments occur. Validate with `npm run lint` and `npm run build`.

## Try it

Sign in as Jordan, add the Trail Backpack to your bag, open checkout, choose Studio pickup and place the practice order. Press Tab to reach Delivery information and press Enter: the dialog opens with its heading and focus on Close delivery information. Press Escape: the dialog closes and focus returns to Delivery information. Open it again and choose Close delivery information. To see the loading message, open DevTools (Network), choose the 3G throttling preset in a fresh page before the first opening: Loading delivery information... shows while the help module downloads. In the optional-help failure copy, place an order and open Delivery information: Delivery help is unavailable. Your order is still confirmed. The close button still works and the confirmed order stays on the page. Set throttling back to No throttling afterwards.
