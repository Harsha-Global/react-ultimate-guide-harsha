# Order Desk — connected to the store

The Order Desk project connected to its Redux store: typed hooks (src/app/hooks.ts), the Provider in src/main.tsx, src/OrderQueue.tsx and src/SelectionSummary.tsx.

## Run

Use Node24.21.0 (the supplied .nvmrc) and the locked dependencies. On Windows, place your active copy at `C:\react\order-desk`. Stop another checkpoint's server before starting this one.

```sh
npm ci
npm run dev
```

Visit http://127.0.0.1:5188. No API server is needed. All five order records are supplied samples. Selecting an order and completing a packing task do not update a real order or collect money. The in-memory Redux state and local form values reset on reload.

```sh
npm run lint
npm run build
```

The queue checkboxes, the ready-only filter and the selection summary are connected to the store.

The Styles folder supplies the exact complete src/index.css for this stage. Local Manrope/DM Sans fonts, licenses and source metadata are under public/assets/fonts. Concept illustrations use the separately packaged course fonts. Narrow screens keep the table inside a labelled keyboard-focusable scroll region, with a visible horizontal-scroll hint.
