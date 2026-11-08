# 04.05. Type Checks & Production Builds - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it: `package.json`
  gains the `check` script (`tsc -b`) beside `dev`, `build`, `lint` and
  `preview`. The source is unchanged from 04.04.
- `Demonstrations/type-error-dev` - `durationMinutes` is declared as a `number`
  but assigned the string `'125'`: the development page still shows it, while
  `npm run check` and `npm run build` report TS2322.
- `Practice/starter` - your starting point: correct the duration value, change
  the invitation to "Browse movies with confidence.", then run the check, the
  lint command and the build, and inspect the result with preview.
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
npm run lint
npm run build
npm run preview
```

`npm run check` runs TypeScript without producing browser files; `npm run lint`
runs Oxlint; `npm run build` checks the types and, only if that succeeds, builds
into `dist`; `npm run preview` serves the last successful build (normally at
http://localhost:4173). Rebuild before previewing a source change. The
type-error-dev demonstration and the practice starter fail the check and the
build on purpose until the quoted duration is fixed.

## What each page shows

| Folder | Page |
| --- | --- |
| movie-discovery | Movie Discovery / Find a movie for your next evening. / Skyward, 125 minutes |
| Demonstrations/type-error-dev | The same page in development; check and build report TS2322 |
| Practice/starter | The same page in development; check and build report TS2322 |
| Practice/solution | Movie Discovery / Browse movies with confidence. / Skyward, 125 minutes |
