# Connect Cart & Inventory Pages

This project matches the finished recording. Continue the existing product-explorer project, or use the complete included project.

## Run locally

Use Node.js 22.22 or newer. In the product-explorer folder, run:

```text
npm ci
npm run api
```

Keep that terminal running. Open a second terminal in the same folder and run:

```text
npm run dev
```

Open http://127.0.0.1:5185. The supplied mock API runs on http://127.0.0.1:4185. This checkpoint still reads the local product array; server loading is added later.

## Check this checkpoint

The collection and product pages connect to Your bag and the read-only Inventory page. Cart quantities, availability warnings, available-item subtotal, removal controls and saved delivery preferences share the existing state. Reloading retains saved intent. Use sample contact details; this local practice project places no order.

```text
npm run check
npm run lint
npm run build
```

Type checking and the production build pass. Lint reports two inherited Fast Refresh export warnings in App.tsx and DeliveryPreferences.tsx, with no errors.

For a fresh supplied mock-data set, stop the API, run npm run api:reset, then restart npm run api. This does not reset browser-local cart or delivery preferences.
