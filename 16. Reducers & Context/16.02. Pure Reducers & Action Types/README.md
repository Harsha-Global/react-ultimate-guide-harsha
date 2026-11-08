# Pure Reducers & Action Types

The completed app contains the exact reducer and action types demonstrated in the video. The app still uses useState; connecting the reducer is the next step.

- Starter/booking-basket: the incoming working app.
- Completed/booking-basket: the demonstrated checkpoint.
- Demonstrations/PureTransitions: isolated pure-function checks. Open this folder and run `node run.ts` with a Node.js version that supports TypeScript type stripping.
- Practice/TypedReducers: the unfinished Starter and separate Solution. From either folder, run `node check.ts`. Starter is expected to fail until the quantity branch is implemented.
- Styles: prepared course styles.

## Run the app

Open either app folder in VS Code. In its terminal run `npm ci`, then `npm run dev`. Open the local address printed by Vite. Validate with `npm run check`, `npm run lint`, and `npm run build`.

The reducer accepts four typed actions, copies only affected data, and preserves the original state for invalid or unchanged requests. Runtime guards accept integer quantities within the event limit. Requests and storage belong outside the reducer.
