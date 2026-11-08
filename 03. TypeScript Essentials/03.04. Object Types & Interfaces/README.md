# 03.04. Object Types & Interfaces - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: a `Movie` type alias, a
  `Booking` interface with a readonly id and an optional note, and a booking
  object that matches it.
- `Demonstrations/missing-property` - the booking object without ticketCount.
- `Demonstrations/with-note` - the booking object with its optional note.
- `Demonstrations/readonly-write` - an assignment to the readonly id.
- `Demonstrations/mutable-count` - an assignment to the writable ticketCount.
- `Practice/starter` - your starting point: add a note and change the ticket
  count to 3.
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
| movie-booking | Skyward: 2 tickets, total 27 / No note |
| Demonstrations/missing-property | error TS2741, and no booking output |
| Demonstrations/with-note | Skyward: 2 tickets, total 27 / Near the aisle |
| Demonstrations/readonly-write | error TS2540, and no booking output |
| Demonstrations/mutable-count | Skyward: 2 tickets, total 27 / No note / Updated count: 3 |
| Practice/starter | Skyward: 2 tickets, total 27 / No note |
| Practice/solution | Skyward: 3 tickets, total 39 / Near the aisle |
