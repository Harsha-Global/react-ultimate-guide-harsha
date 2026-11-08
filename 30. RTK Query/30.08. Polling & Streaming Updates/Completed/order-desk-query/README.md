# Order Desk — polling and a live order stream

The Order Desk project whose search view can poll the order service every two seconds (pollingInterval and refetchOnFocus, with setupListeners in src/main.tsx) and whose Live view keeps a getLiveOrders cache entry current from the service's event stream (onCacheEntryAdded with an EventSource, src/LiveQueue.tsx), with local demo controls for outside changes (src/DemoControls.tsx).

## Run

Use Node24.21.0 (the supplied .nvmrc) and the locked dependencies. On Windows, place your active copy at `C:\react\order-desk-query`. Stop another checkpoint's server before starting this one.

```sh
npm ci
npm run api
npm run dev
```

Run `npm run api` (the order service, port 5189) and `npm run dev` in two terminals, then visit http://127.0.0.1:5188. Open North or South first (a local demo session; no real account). All five order records are supplied samples. Selecting an order and completing a packing task do not update a real order or collect money. The in-memory Redux state and local form values reset on reload.

```sh
npm run lint
npm run build
```

The queue checkboxes, the ready-only filter and the selection summary are connected to the store.

src/index.css holds the prepared stylesheet. Local Manrope/DM Sans fonts, licenses and source metadata are under public/assets/fonts. Narrow screens keep the table inside a labelled keyboard-focusable scroll region, with a visible horizontal-scroll hint.
