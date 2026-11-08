# 05.07. Styling & CSS Modules - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/assets` holds
  the two supplied posters, `Movie` has a `poster` property, `movies.ts`
  imports each file and assigns it, `MovieList` passes the prop on, and
  `MovieCard` renders the image. `src/MovieCard.module.css` styles the card
  (grid and gap, the neutral border, the availability colours, the poster and
  the status text), and `MovieCard.tsx` combines `styles.card` with
  `styles.available` or `styles.upcoming`. `src/index.css` gains the page-wide
  list grid, section spacing and footer colour.
- `Demonstrations/inline-style` - the same card with a style object passed
  directly to the article, for comparison only.
- `Practice/starter` - your starting point: in the card's module, change the
  gap to 12px and give the poster a 1px solid #788597 border.
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
checks the types and, only if that succeeds, builds into `dist`. Every folder
here checks and builds successfully.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Two movie cards in a responsive grid, each with its poster and an availability border |
| Demonstrations/inline-style | The same cards with the inline padding and background colour |
| Practice/starter | The same page as movie-discovery |
| Practice/solution | A 12px gap inside each card and a bordered poster |
