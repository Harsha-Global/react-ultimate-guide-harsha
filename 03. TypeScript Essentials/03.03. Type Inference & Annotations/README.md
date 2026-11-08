# 03.03. Type Inference & Annotations - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: an annotated ticket count
  assigned on the next line, a `number[]` price list and a sold-out flag.
- `Demonstrations/wrong-number` - a string assigned to the inferred number.
- `Demonstrations/wrong-array` - a string element in the `number[]` list.
- `Demonstrations/wrong-flag` - the string "false" assigned to a boolean.
- `Practice/starter` - your starting point: add 21 to the prices and change
  the ticket count to 3.
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
| movie-booking | Skyward: 2 tickets, total 27 / Price options: 12, 15, 18 / Sold out: false |
| Demonstrations/wrong-number | error TS2322, and no booking output |
| Demonstrations/wrong-array | error TS2322, and no booking output |
| Demonstrations/wrong-flag | error TS2322, and no booking output |
| Practice/starter | Skyward: 2 tickets, total 27 / Price options: 12, 15, 18 / Sold out: false |
| Practice/solution | Skyward: 3 tickets, total 39 / Price options: 12, 15, 18, 21 / Sold out: false |
