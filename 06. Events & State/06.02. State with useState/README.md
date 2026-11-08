# 06.02. State with useState - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: the new
  `src/TicketSelector.tsx` keeps the ticket quantity with
  `const [quantity, setQuantity] = useState(1);`, and its Add one ticket
  button requests `setQuantity(quantity + 1)`. `src/App.tsx` renders it in the
  Book Skyward panel.
- `Demonstrations/local-variable` - the first attempt, with an ordinary
  `let quantity = 1;`: the console counts up, but the page stays at
  Tickets: 1.
- `Practice/starter` - your starting point: add a Reset tickets button that
  requests quantity 1. `Practice/README.md` is the brief.
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
prints (normally http://localhost:5173) in Chrome and scroll to the booking
panel. Stop a running server (Ctrl+C, or the terminal's trash button) before
starting another folder's server. `npm run build` checks the types and builds
into `dist`.

## What each page does

| Folder | Add one ticket | Also |
| --- | --- | --- |
| movie-discovery | Tickets: 1, 2, 3 ... | A reload starts again at 1 |
| Demonstrations/local-variable | Stays at Tickets: 1 | Console: Local quantity: 2, 3 ... |
| Practice/starter | The same as movie-discovery | |
| Practice/solution | The same as movie-discovery | Reset tickets returns to 1 |
