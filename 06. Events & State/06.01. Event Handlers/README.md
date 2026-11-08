# 06.01. Event Handlers - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `src/MovieCard.tsx`
  declares `handleShowTitle` (logs "Movie: <title>") for the Log button,
  `handleButtonDetails(event: MouseEvent<HTMLButtonElement>)` (logs the
  button's `currentTarget.name`) for the Inspect button, and
  `handlePreview(format: string)`, called by the Preview button through
  `onClick={() => handlePreview("standard")}`.
- `Practice/starter` - your starting point: add a second preview button that
  passes "premium" to `handlePreview`, keeping the standard one.
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
prints (normally http://localhost:5173) in Chrome, open DevTools (F12) and
watch the Console while you click the buttons. Stop a running server
(Ctrl+C, or the terminal's trash button) before starting another folder's
server. `npm run build` checks the types and builds into `dist`.

## What each page logs

| Folder | Console output |
| --- | --- |
| movie-discovery | Movie: Skyward / Button: Skyward / Preview: Skyward, standard |
| Practice/starter | The same as movie-discovery |
| Practice/solution | Also Preview: Skyward, premium, from the new button |
