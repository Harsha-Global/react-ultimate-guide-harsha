# 03.05. Function & Callback Types - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: getSubtotal with typed
  parameters and a return type, the Discount function type, getBookingTotal
  with a default callback, and formatNote with an optional parameter.
- `Demonstrations/missing-return` - getSubtotal without its return keyword.
- `Demonstrations/wrong-callback` - a Discount callback that returns a string.
- `Demonstrations/optional-note` - formatNote called with a note.
- `Practice/starter` - the Typed Callbacks exercise: complete studentRule and
  priceTickets. `Practice/README.md` is the brief.
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
| movie-booking | Regular: 27.00 / Discounted: 24.60 / No note |
| Demonstrations/missing-return | error TS2355, and no output |
| Demonstrations/wrong-callback | error TS2322, and no output |
| Demonstrations/optional-note | Regular: 27.00 / Discounted: 24.60 / No note / Near the aisle |
| Practice/starter | 0 / 0 (until you complete it) |
| Practice/solution | 19.200000000000003 / 24 |

19.200000000000003 is how JavaScript prints 12 * 2 * 0.8; it is approximately
19.2, as the brief expects.
