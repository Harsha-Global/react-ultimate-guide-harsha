# Composition & Context

The completed app contains the exact source demonstrated in the video. App keeps the reducer state and four action handlers. PageShell positions three renderable slots: header, summary and children.

- Starter/booking-basket: the incoming app with useReducer and dispatch.
- Completed/booking-basket: the demonstrated composition layout.
- Styles: the existing course stylesheet.

## Run the app

Open either app folder in VS Code. Run npm ci, then npm run dev, and open the local address printed by Vite. Validate with npm run check, npm run lint and npm run build.

Add Studio painting twice: the header shows two tickets and the summary shows $70. Change the quantity to four: both views update, and the total becomes $140. At a narrow viewport, the summary stacks below the basket. Returning to the desktop layout retains the same basket.

PageShell receives configured React elements and does not own basket rows or update rules. The deeper header and badge tree in the explanation is hypothetical; this source does not introduce context yet.
