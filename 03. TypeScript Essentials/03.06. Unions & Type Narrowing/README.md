# 03.06. Unions & Type Narrowing - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: the TicketCategory union,
  getCategoryPrice, getBookingTotal returning early for a null category, and
  printTotal checking for undefined before formatting the total.
- `Demonstrations/unsupported-category` - printTotal called with "vip".
- `Demonstrations/unchecked-total` - a possibly undefined total formatted
  without a check.
- `Practice/starter` - the Union Narrowing exercise: complete
  selectedTicketTotal. `Practice/README.md` is the brief.
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
| movie-booking | Total: 27.00 / Total: 22.20 / Choose a ticket category |
| Demonstrations/unsupported-category | error TS2345, and no output |
| Demonstrations/unchecked-total | error TS18048, and no output |
| Practice/starter | 0 / 0 / 0 (until you complete it) |
| Practice/solution | 24 / 19.200000000000003 / undefined |

19.200000000000003 is how JavaScript prints 12 * 0.8 * 2; it is approximately
19.2, as the brief expects.
