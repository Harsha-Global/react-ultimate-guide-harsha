# 06.05. Inputs & Derived Values - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it:
  - `src/BookingPanel.tsx` keeps `guestName` (`useState("")`) and `showtime`
    (`useState("18:00")`) as state beside the quantity, controls them with a
    labelled `<input>` and a `<select>`, and derives
    `ticketPrice = showtime === "21:00" ? 15 : 12` and
    `total = quantity * ticketPrice` during rendering;
  - `src/BookingSummary.tsx` shows `guestName.trim() || "Guest"`, the showtime
    and the total, and at six tickets the "Maximum six tickets per booking."
    text with the `at-limit` border;
  - `src/index.css` styles the controls and the summary.
- `Practice/starter` - your starting point: add a $2-per-ticket booking fee,
  derived and included in the total. `Practice/README.md` is the brief.
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

| Folder | 2 tickets at 18:00 | 2 tickets at 21:00 |
| --- | --- | --- |
| movie-discovery | Total: $24 | Total: $30 |
| Practice/starter | Total: $24 | Total: $30 |
| Practice/solution | Total: $28 (fee $4) | Total: $34 (fee $4) |
