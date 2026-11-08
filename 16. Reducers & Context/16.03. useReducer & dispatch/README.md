# useReducer & dispatch

The completed app contains the exact source demonstrated in the video. App connects the pure basket reducer with useReducer, then dispatches typed actions from the existing event handlers.

- Starter/booking-basket: the incoming working app, with the reducer defined.
- Completed/booking-basket: the demonstrated app with all four dispatch handlers.
- Styles: the prepared course stylesheet.

## Run the app

Open either app folder in VS Code. Run npm ci, then npm run dev. Open the local address printed by Vite. Validate with npm run check, npm run lint and npm run build.

Add Studio painting twice: one row, two tickets, $70. Select four tickets and try Add again: the limit remains four. Add Supper club: five tickets, $200. Remove Studio painting: one ticket, $60. Clear the basket: zero tickets, $0.

The current render keeps its state snapshot. Dispatch requests an update; the next render receives the new state. Totals are derived from those rows. Reducers stay pure, and state and callbacks still travel through props.
