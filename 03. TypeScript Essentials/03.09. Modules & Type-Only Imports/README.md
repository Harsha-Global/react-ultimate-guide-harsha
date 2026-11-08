# 03.09. Modules & Type-Only Imports - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: `types.ts`, `pricing.ts`,
  `requests.ts` and `collections.ts` hold the moved declarations, and `app.ts`
  imports them - types with `import type`, functions with ordinary imports.
- `Demonstrations/value-import-for-type` - a type imported without `type`.
- `Demonstrations/missing-js-extension` - a relative import path without `.js`.
- `Demonstrations/wrong-caller` - an unsupported category passed across modules.
- `Practice/starter` - add one saved standard booking with four tickets.
  `Practice/README.md` is the brief.
- `Practice/solution` - the complete solution. Try the starter first.
- `Setup Guide.md` - the commands, the configuration, and recovery steps.

## Running a project

Open one folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm start
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm start` builds `src` into `dist`, then runs `dist/app.js`. Use
`npm run check` to type-check without writing JavaScript.

## What each one prints

| Folder | Output |
| --- | --- |
| movie-booking | Total: 31.80 / Ticket count must be a positive whole number / First movie: Skyward / First category: standard / Empty selection: No movie |
| Demonstrations/value-import-for-type | error TS1484 (three names), and no output |
| Demonstrations/missing-js-extension | error TS2835, and no output |
| Demonstrations/wrong-caller | error TS2345, and no output |
| Practice/starter | the five movie-booking lines |
| Practice/solution | the five lines, then Total: 51.00 |
