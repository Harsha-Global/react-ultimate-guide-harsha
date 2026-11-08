# 03.07. unknown, any & Assertions - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: the TicketRequest
  interface, parseTicketRequest checking saved JSON before returning a typed
  request, and showSavedBooking handling success and rejection.
- `Demonstrations/unsafe-assertion` - a type assertion over a string count.
- `Demonstrations/unsafe-any` - the same data through an explicit any.
- `Demonstrations/unchecked-unknown` - an unknown value read without a check.
- `Demonstrations/invalid-data` - the parser rejecting several kinds of bad data.
- `Practice/starter` - the Unsafe Assertions exercise: replace the assertion
  in parseTicketRequest with checks. `Practice/README.md` is the brief.
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
| movie-booking | Total: 31.80 / Ticket count must be a positive whole number |
| Demonstrations/unsafe-assertion | Next count: 31 |
| Demonstrations/unsafe-any | Next count: 31 |
| Demonstrations/unchecked-unknown | error TS18046, and no output |
| Demonstrations/invalid-data | Total: 31.80, then one rejection message per bad request |
| Practice/starter | 27 / 31.800000000000004 (the bug to fix) |
| Practice/solution | 27 / Ticket count must be a positive whole number |

The JSON syntax message comes from the JavaScript runtime, so its wording can
differ between Node versions.
