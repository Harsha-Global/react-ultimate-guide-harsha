# 06.06. Immutable Array Updates - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it:
  - `src/cart.ts` declares the read-only `CartItem` type and two pure helpers:
    `addBooking` adds a new row with array spread (`[...items, booking]`) or,
    for an existing showtime, maps to a replacement array with a new object for
    that row (`{ ...item, quantity: Math.min(6, ...) }`); `changeCartQuantity`
    follows the same replacement pattern within 1-6;
  - `src/BookingPanel.tsx` keeps `cart` (`useState<CartItem[]>([])`) and
    `selectedId` (`useState<string | null>(null)`), adds the form's booking
    with `setCart(current => addBooking(current, booking))`, removes a row with
    `filter` and clears a removed selection;
  - `src/TicketCart.tsx` shows each row with `key={item.id}`, a Select button
    with `aria-pressed`, Add ticket and Remove buttons, the total from
    `items.reduce(...)`, the selected show, and "Your ticket cart is empty."
    when there are no rows.
- `Practice/starter` - your starting point: implement `changeCartQuantity` in
  `src/cart.ts` without mutating the old array or objects.
  `Practice/README.md` is the brief.
- `Practice/solution` - the complete solution; `Practice/Solution
  Explanation.md` explains it. Try the starter first.
- `Setup Guide.md` - the commands, the toolchain and recovery steps.

## Running a project

Open one folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. Stop a running server
(Ctrl+C, or the terminal's trash button) before starting another folder's
server. `npm run build` checks the types and builds into `dist`.

## What each page does

| Folder | Try | Result |
| --- | --- | --- |
| movie-discovery | 1 ticket at 18:00 and 2 at 21:00 added to the cart | Cart total: $42; one more at 18:00 gives $54 |
| Practice/starter | Add 18:00 | 18:00 stays at 1 ticket (not implemented yet) |
| Practice/solution | Add 18:00 | 18:00 becomes 2 tickets; 21:00 is unchanged |
