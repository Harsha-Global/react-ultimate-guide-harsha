# 06.03. Functional State Updates - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/TicketSelector.tsx`
  keeps the quantity between 1 and 6 with updater functions:
  `setQuantity(current => Math.min(6, current + 1))` to add one,
  `setQuantity(current => Math.max(1, current - 1))` to remove one, and the same
  bounded increment queued twice in `handleAddTwo`. The buttons are disabled at
  the boundaries.
- `Demonstrations/queued-replacements` - the broken shortcut: `handleAddTwo`
  calls `setQuantity(Math.min(6, quantity + 1))` twice, so both calls request
  the same replacement value and Add two tickets shows 2, not 3.
- `Practice/starter` - the Fix Queued State Updates exercise: repair Add two
  tickets in `src/App.tsx` so one activation from 1 displays 3, keeping the
  1-6 bounds. `Practice/README.md` is the brief.
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
| movie-discovery | Tickets: 3 (then 5, then 6) | Remove one ticket stops at 1 |
| Demonstrations/queued-replacements | Tickets: 2 | Both calls replace with the same value |
| Practice/starter | Tickets: 2 | Fix it |
| Practice/solution | Tickets: 3 | The same bounds as movie-discovery |
