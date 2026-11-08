# 04.02. JSX & the Entry Point - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/main.tsx`
  stores the root lookup in `container` and throws "Root element not found"
  when it is missing; `src/App.tsx` inserts `pageTitle`, `tagline` and
  `{2 + 1}` as JSX expressions and gives `<main>` the class `page`.
- `Demonstrations/missing-root` - the container's id no longer matches
  `root`; the Console shows the explicit error.
- `Demonstrations/literal-text` - a string containing `<em>` tags is shown
  as text, not markup.
- `Demonstrations/unclosed-tag` - a paragraph without its closing tag; Vite
  reports the syntax error.
- `Practice/starter` - your starting point: add `featuredCount` and use it
  instead of the inline addition. `Practice/README.md` is the brief.
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
unclosed-tag demonstration fails to build on purpose until its tag is closed.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Movie Discovery / Find a movie for your next evening. / 3 movies to explore |
| Demonstrations/missing-root | Nothing; the Console shows "Root element not found" |
| Demonstrations/literal-text | Movie Discovery / <em>Find a movie</em> (as text) / 3 movies to explore |
| Demonstrations/unclosed-tag | The Vite error overlay: Expected corresponding JSX closing tag for 'p' |
| Practice/starter | Movie Discovery / Find a movie for your next evening. / 3 movies to explore |
| Practice/solution | Movie Discovery / Find a movie for your next evening. / 4 movies to explore |
