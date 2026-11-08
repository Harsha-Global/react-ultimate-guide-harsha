# 04.03. Function Components - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/PageHeader.tsx`
  (a default export) returns the page header, `src/MovieSummary.tsx` (a named
  export) returns one movie's article, and `src/App.tsx` composes them inside
  `<main>`.
- `Demonstrations/repeated-component` - the same component used twice: two
  summaries from one definition.
- `Demonstrations/incorrect-import` - `MovieSummary` imported as a default
  export; `npm run build` reports that the module has no default export.
- `Practice/starter` - your starting point: add a `PageFooter` component with
  the message "More movies coming soon." and place it after the summary.
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
trash button) before starting another folder's server. `npm run build`
checks the types and builds into `dist`; `npm run lint` runs Oxlint. The
incorrect-import demonstration fails to build on purpose until its import is
fixed.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Movie Discovery / Find a movie for your next evening. / Skyward, 125 minutes |
| Demonstrations/repeated-component | The same page with two Skyward summaries |
| Demonstrations/incorrect-import | Build error TS2613: the module has no default export |
| Practice/starter | Movie Discovery / Find a movie for your next evening. / Skyward, 125 minutes |
| Practice/solution | The same page, then the footer: More movies coming soon. |
