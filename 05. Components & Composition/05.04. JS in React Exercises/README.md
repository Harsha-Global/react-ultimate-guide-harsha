# JS in React Exercises - source code

This lecture introduces Udemy's coding-exercise editor: JavaScript with JSX in a supplied `App.js`, Run tests,
named feedback, a focused fix and a second run. The course project itself does not change.

## Folders

- `movie-discovery` - the course project, unchanged by this lecture (TypeScript, `.tsx` files).
- `Comparison/MovieCard.tsx` and `Comparison/MovieCard.jsx` - the familiar MovieCard component, typed and in plain
  JavaScript: the JavaScript version leaves out the props type and the parameter annotation and keeps the same
  destructuring, default value, JSX and exported function.
- `Practice/starter` and `Practice/solution` - the TypeScript companion of the Props and Lists coding exercise
  (`Practice/README.md`). Try the exercise in Udemy's editor first.
- `Reference.md` - a one-page comparison of the course project and the exercise editor.
- `Setup Guide.md` - the commands, the toolchain and recovery steps.

## Running a project

Open one folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy). `npm run dev` starts the Vite
development server; open the Local address it prints in Chrome and keep the terminal running while you work. Stop a
running server (Ctrl+C) before starting another folder's server. `npm run check` runs TypeScript without producing
browser files; `npm run build` checks the types and builds into `dist`.

No installation is needed for the Udemy exercise itself: it runs in Udemy's editor.
