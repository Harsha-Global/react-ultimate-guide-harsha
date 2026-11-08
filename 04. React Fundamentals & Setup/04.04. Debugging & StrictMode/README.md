# 04.04. Debugging & StrictMode - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it, unchanged from
  04.03: `src/App.tsx` composes `PageHeader` and `MovieSummary`, and
  `src/main.tsx` keeps `<StrictMode>` around `<App />`.
- `Demonstrations/wrong-type` - `durationMinutes` is declared as a `number`
  but assigned the string `'125'`; `npm run build` reports TS2322.
- `Demonstrations/render-log` - `MovieSummary` logs "MovieSummary render";
  a clean reload in development shows two messages and one article.
- `Demonstrations/external-mutation` - a counter outside `MovieSummary` is
  incremented during rendering; a clean load shows "Render counter: 2".
- `Practice/starter` - your starting point: fix the quoted duration using the
  type diagnostic. `Practice/README.md` is the brief.
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
wrong-type demonstration and the practice starter fail to build on purpose
until the quoted duration is fixed.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Movie Discovery / Find a movie for your next evening. / Skyward, 125 minutes |
| Demonstrations/wrong-type | Build error TS2322 until the quotes are removed |
| Demonstrations/render-log | The same page; the Console shows "MovieSummary render" |
| Demonstrations/external-mutation | The same page with "Render counter: 2" after a clean load |
| Practice/starter | Build error TS2322: fix the quoted duration |
| Practice/solution | Movie Discovery / Find a movie for your next evening. / Skyward, 125 minutes |
