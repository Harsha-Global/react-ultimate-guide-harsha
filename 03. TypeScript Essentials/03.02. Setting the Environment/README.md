# 03.02. Setting the Environment - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project built in the lecture: `package.json` with the
  check, build and start scripts, `tsconfig.json`, and `src/app.ts`.
- `Demonstrations/wrong-count` - the same project with the count assigned the
  string "2", so the build fails and nothing runs.
- `Practice/starter` - your starting point: change the ticket count to 3.
- `Practice/solution` - the complete solution. Try the starter first.
- `Setup Guide.md` - the commands, each configuration setting, and recovery
  steps.

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
| movie-booking | Skyward: 2 tickets, total 27 |
| Demonstrations/wrong-count | error TS2322, and no booking message |
| Practice/starter | Skyward: 2 tickets, total 27 |
| Practice/solution | Skyward: 3 tickets, total 39 |
