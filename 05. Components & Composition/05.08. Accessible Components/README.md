# 05.08. Accessible Components - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: every movie
  carries a `synopsis`, `MovieCard` shows it inside a native
  `<details>`/`<summary>` disclosure named after the movie, the decorative
  poster has `alt=""`, `App.tsx` starts with a "Skip to movies" link pointing
  at `id="main-content"` on a `tabIndex={-1}` main element inside a Fragment,
  and `src/index.css` gains the `summary`, `:focus-visible` and `.skip-link`
  rules that keep keyboard focus visible.
- `Practice/starter` - your starting point: change the disclosure prefix from
  "About" to "Movie details for", keeping each movie title in the control's
  name. `Practice/README.md` is the brief.
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

## Checking it with the keyboard

Reload the page and press Tab without clicking first: the skip link appears
with a focus outline. Press Enter to jump to the main content, Tab to a
movie's summary, then Enter or Space to open and close its synopsis. The
browser provides that behaviour; nothing in the components stores it.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Two movie cards, each with an "About <title>" disclosure holding its synopsis |
| Practice/starter | The same page, with the "About" prefix |
| Practice/solution | The same page, with "Movie details for <title>" |
