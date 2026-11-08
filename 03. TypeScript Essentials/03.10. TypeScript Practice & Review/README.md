# 03.10. TypeScript Practice & Review - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the completed project: the child category at half price,
  saved ticket counts from 1 to 6, and the unchanged generic helper.
- `Demonstrations/boundary-checks` - the accepted endpoints (1 and 6) and the
  rejected inputs (0, a fraction, a numeric string, an unsupported category).
- `Practice/starter` - the Modules & Type-Only Imports source, before the
  practice. `Practice/README.md` is the brief.
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
| movie-booking | Total: 21.00 / Ticket count must be a whole number from 1 to 6 / First movie: Skyward / First category: standard / Empty selection: No movie |
| Demonstrations/boundary-checks | the five lines above, then Total: 15.00 / Total: 39.00 / three count rejections / Choose a supported ticket category / Choose a ticket category |
| Practice/starter | Total: 31.80 / Ticket count must be a positive whole number / First movie: Skyward / First category: standard / Empty selection: No movie |
| Practice/solution | the same five lines as movie-booking |
