# Order Desk — an asynchronous packing preview

The Order Desk project with the local preview service (server/preview.mjs, `npm run api`), the preparePacking async thunk with its preview slice, and the PackingPreview component with its pending, error and result states.

## Run

Use Node24.21.0 (the supplied .nvmrc) and the locked dependencies. On Windows, place your active copy at `C:\react\order-desk`. Stop another checkpoint's server before starting this one.

```sh
npm ci
npm run api
npm run dev
```

Run `npm run api` (the local preview service, port 5189) and `npm run dev` in two terminals, then visit http://127.0.0.1:5188. All five order records are supplied samples. Selecting an order and completing a packing task do not update a real order or collect money. The in-memory Redux state and local form values reset on reload.

```sh
npm run lint
npm run build
```

The queue checkboxes, the ready-only filter and the selection summary are connected to the store.

src/index.css holds the prepared stylesheet. Local Manrope/DM Sans fonts, licenses and source metadata are under public/assets/fonts. Narrow screens keep the table inside a labelled keyboard-focusable scroll region, with a visible horizontal-scroll hint.
