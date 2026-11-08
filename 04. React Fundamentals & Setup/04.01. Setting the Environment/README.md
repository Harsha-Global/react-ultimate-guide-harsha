# 04.01. Setting the Environment - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project created in the lecture: the Vite React
  TypeScript template with `"strict": true` in `tsconfig.app.json` and
  `tsconfig.node.json`, the small starting page in `src/App.tsx`, the global
  stylesheet `src/index.css`, and the "Movie Discovery" page title in
  `index.html`. The unused template files (`App.css`, `assets`, `public`,
  `README.md`) are removed.
- `Practice/starter` - your starting point: change the invitation to
  "Find your next movie." `Practice/README.md` is the brief.
- `Practice/solution` - the complete solution. Try the starter first.
- `Setup Guide.md` - the commands, the toolchain, React Developer Tools and
  recovery steps.

## Running a project

Open one folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome and keep the terminal
running while you work. `npm run build` checks the types and builds into
`dist`; `npm run lint` runs Oxlint.

These projects pin the exact versions that were tested. A fresh
`create-vite` scaffold lists version ranges instead, so its lock file may
resolve slightly newer packages.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Movie Discovery / Find a movie for your next evening. |
| Practice/starter | Movie Discovery / Find a movie for your next evening. |
| Practice/solution | Movie Discovery / Find your next movie. |
