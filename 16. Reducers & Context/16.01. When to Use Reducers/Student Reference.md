# When to Use Reducers

The completed project is the exact useState app shown in the video. Its behaviour stays unchanged while we inspect the basket rules.

## Run the example

Copy Starter/booking-basket to your React workspace and open it in VS Code. Use Node 22.22.0 or newer, as required by package.json. Retain package-lock.json.

    npm ci
    npm run dev

Open http://localhost:5186. Copy Styles/index.css into the project's src folder when following the design step. The existing import in src/main.tsx applies it.

## Check the basket

Add Studio painting twice: one row, two tickets, $70.00. Set the quantity to four: $140.00. Another add stays at four. Remove the row: zero tickets and $0.00.

## Find the rules

- src/models.ts: BasketLine holds an event identifier and quantity; BasketState contains lines.
- src/events.ts: fixed records, prices, ticket limits and findEvent.
- src/App.tsx: useState owns the basket; add, quantity, remove and clear functions return immutable updates.
- src/totals.ts: ticketCount and totalCents calculate derived values.
- Header and OrderSummary calculate their displayed values from the current rows.

A reducer organizes connected transition rules. A simple independent toggle may remain with useState. A reducer does not automatically share state, and Array.reduce is a separate array method. The next step is to define pure transitions and typed actions.

Keep public/assets with the project, including Manrope and DM Sans fonts, their licenses and the supplied event artwork. This local example does not reserve real seats and does not persist the basket across a full reload.

## Validate the source

    npm run check
    npm run lint
    npm run build
