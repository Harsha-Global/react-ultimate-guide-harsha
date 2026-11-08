# 06.04. Callbacks & Lifting State - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it:
  - `src/BookingPanel.tsx` owns the quantity with `useState(1)`, and its
    `handleQuantityChange(change)` keeps it between 1 and 6;
  - `src/TicketControls.tsx` receives `quantity` and the
    `onQuantityChange: (change: number) => void` callback prop, and each button
    requests -1, 1 or 2 through a small wrapper;
  - `src/BookingSummary.tsx` displays the same quantity from its prop;
  - `src/App.tsx` renders `<BookingPanel />` in the Book Skyward panel;
    `src/MovieCard.tsx` no longer has the temporary console buttons, and
    `TicketSelector.tsx` is gone.
- `Practice/starter` - your starting point: add a Reset tickets button with a
  separate `onReset: () => void` callback, handled in BookingPanel.
  `Practice/README.md` is the brief.
- `Practice/solution` - the complete solution. Try the starter first.
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

| Folder | Add two tickets from 1 | Also |
| --- | --- | --- |
| movie-discovery | Tickets: 3 and Booking summary: 3 tickets for Skyward. | Both stop at 6 and at 1 |
| Practice/starter | The same as movie-discovery | |
| Practice/solution | The same as movie-discovery | Reset tickets returns both to 1 |
