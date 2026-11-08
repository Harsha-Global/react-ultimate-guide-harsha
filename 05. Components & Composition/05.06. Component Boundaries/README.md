# 05.06. Component Boundaries - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it:
  `src/MovieCatalog.tsx` owns the movie section. It takes `movies`, derives
  `availableCount` from that prop with `movies.filter(...).length`, and returns
  the reusable `Panel` titled "Explore movies" with the count in its footer and
  `MovieList` inside it. `src/App.tsx` renders one
  `<MovieCatalog movies={movies} />` beside the page header and the booking
  panel. `Panel` and `MovieList` are unchanged.
- `Demonstrations/empty-catalog` - the catalog receives an empty array: its
  footer reads Available movies: 0 and the list reports No movies found.
- `Practice/starter` - your starting point: extend the catalog's footer to read
  "Available movies: 1 of 2", deriving both numbers from its `movies` prop, and
  test it with an empty array. `Practice/README.md` is the brief.
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
checks the types and, only if that succeeds, builds into `dist`. Every folder
here checks and builds successfully.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Explore movies: the two movie cards and Available movies: 1; Booking information: one paragraph |
| Demonstrations/empty-catalog | The same section with Available movies: 0 and No movies found. |
| Practice/starter | The same page as movie-discovery |
| Practice/solution | The same page, with the footer reading Available movies: 1 of 2 |
