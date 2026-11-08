# 05.02. Lists & Keys - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/types.ts`
  declares the readonly `Movie` type (`id`, `title`, `durationMinutes` and the
  optional `rating`), `src/movies.ts` exports the typed array with the ids
  `m1` and `m2`, and `src/App.tsx` maps that array to one `<li key={movie.id}>`
  per movie, each holding a `MovieCard`.
- `Demonstrations/reordered` - Night Signals first in the data: the page
  follows the array, and the ids are unchanged.
- `Demonstrations/missing-key` - the list item without a key: the page looks
  the same, and React warns in the browser Console.
- `Practice/starter` - your starting point: add Quiet Harbor (id `m3`, 110
  minutes, no rating) to the array, without writing another card by hand.
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
checks the types and, only if that succeeds, builds into `dist`. A missing key
is a React warning printed while the page renders, not a type error, so every
folder here checks and builds successfully.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Skyward, 125 minutes, Rating: PG / Night Signals, 98 minutes, Rating: Not rated |
| Demonstrations/reordered | Night Signals first, then Skyward; the same ids |
| Demonstrations/missing-key | The same two cards, and a key warning in the Console |
| Practice/starter | The same two cards as movie-discovery |
| Practice/solution | A third item: Quiet Harbor, 110 minutes, Rating: Not rated |
