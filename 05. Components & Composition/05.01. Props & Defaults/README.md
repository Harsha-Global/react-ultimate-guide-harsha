# 05.01. Props & Defaults - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/MovieCard.tsx`
  declares a readonly `MovieCardProps` type (required `title` and
  `durationMinutes`, optional `rating`) and destructures its props with the
  default `rating = 'Not rated'`; `src/App.tsx` renders two `MovieCard`
  elements; `MovieSummary.tsx` is gone.
- `Demonstrations/default-boundaries` - passes `undefined` and an empty string
  as the rating: the first card shows "Not rated", the second shows nothing.
- `Demonstrations/wrong-prop-type` - a quoted duration: TS2322.
- `Demonstrations/missing-required-prop` - no `title`: TS2741.
- `Demonstrations/mutate-prop` - an assignment to `props.title`: TS2540.
- `Practice/starter` - your starting point: add a third card, "Quiet Harbor",
  110 minutes, without a rating, and predict what the page shows first.
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
prints (normally http://localhost:5173) in Chrome and keep the terminal
running while you work. Stop a running server (Ctrl+C, or the terminal's
trash button) before starting another folder's server. In a second terminal:

```
npm run check
npm run build
```

`npm run check` runs TypeScript without producing browser files; `npm run build`
checks the types and, only if that succeeds, builds into `dist`. The
wrong-prop-type, missing-required-prop and mutate-prop demonstrations fail the
check and the build on purpose.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Skyward, 125 minutes, Rating: PG / Night Signals, 98 minutes, Rating: Not rated |
| Demonstrations/default-boundaries | Skyward, Rating: Not rated / Night Signals, Rating: (nothing) |
| Demonstrations/wrong-prop-type | Check and build report TS2322 |
| Demonstrations/missing-required-prop | Check and build report TS2741 |
| Demonstrations/mutate-prop | Check and build report TS2540 |
| Practice/starter | The same two cards as movie-discovery |
| Practice/solution | A third card: Quiet Harbor, 110 minutes, Rating: Not rated |
