# 03.08. Generic Functions - source code

Everything demonstrated in this lecture.

## Folders

- `movie-booking` - the project after this lecture: the generic
  firstOrUndefined helper, called with movies, ticket categories and an empty
  movie list.
- `Demonstrations/wrong-property` - reading a property a Movie does not have.
- `Demonstrations/unchecked-empty` - using the result without handling undefined.
- `Practice/starter` - the Generic Functions exercise: replace the unknown-only
  signature with a generic one. `Practice/README.md` is the brief.
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
| Demonstrations/wrong-property | error TS2339, and no output |
| Demonstrations/unchecked-empty | error TS2532, and no output |
| Practice/starter | undefined / undefined / undefined (until you complete it) |
| Practice/solution | 12 / standard / undefined |
