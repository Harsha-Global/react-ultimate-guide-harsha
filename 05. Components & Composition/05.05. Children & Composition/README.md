# 05.05. Children & Composition - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/Panel.tsx`
  declares `title`, a required `children` and an optional `footer` (both typed
  as `ReactNode`) and places them inside a `<section>`; `src/App.tsx` composes
  two panels, one holding the movie list with a footer and one holding a
  paragraph; `src/MovieCard.tsx` shows each movie title as a third-level
  heading, below the panel's second-level heading.
- `Demonstrations/text-children` - the second panel receives ordinary text
  instead of a paragraph element, and still renders.
- `Practice/starter` - your starting point: add a third panel titled "Cinema
  access" with a paragraph and no footer. `Practice/README.md` is the brief.
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
| movie-discovery | Explore movies: the two movie cards and a footer note; Booking information: one paragraph |
| Demonstrations/text-children | The same two panels, the second one holding plain text |
| Practice/starter | The same page as movie-discovery |
| Practice/solution | A third panel, Cinema access, with its paragraph and no footer |
