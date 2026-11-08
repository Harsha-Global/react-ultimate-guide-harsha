# 05.03. Conditional Rendering - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `isAvailable` in
  the `Movie` type and in both movies, a conditional label and the
  `AvailabilityNote` component in `src/MovieCard.tsx`, and `src/MovieList.tsx`
  with its empty-list early return, the optional `showCount` paragraph and the
  Fragment that holds both children.
- `Demonstrations/empty-list` - an empty array: the early return's message.
- `Demonstrations/hidden-count` - `showCount={false}`: the list without its
  count paragraph.
- `Demonstrations/zero-and` - `{count && …}` with a count of 0: the number 0
  appears on the page.
- `Demonstrations/boolean-and` - `{count > 0 && …}`: false, so nothing
  appears.
- `Practice/starter` - your starting point: make Night Signals available and
  hide the count paragraph. `Practice/README.md` is the brief.
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
here checks and builds successfully: the zero-and comparison is a rendering
result, not a type error.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | 2 movies to explore; Skyward (Available, with the ticket note) and Night Signals (Coming soon) |
| Demonstrations/empty-list | No movies found. |
| Demonstrations/hidden-count | Both cards, without the count paragraph |
| Demonstrations/zero-and | Guard comparison, and a 0 below it |
| Demonstrations/boolean-and | Guard comparison, and nothing below it |
| Practice/starter | The same page as movie-discovery |
| Practice/solution | Two Available labels, two ticket notes, no count |
