# 08.02. State Snapshots - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  `BookingPanel` adds the `adjustment` state (starting as an empty string) and
  `handleAddAndDescribe`: it calculates `nextQuantity` (the current quantity
  plus one, capped at six), passes it to `setQuantity`, and uses that same
  value in the `setAdjustment` message, so the message agrees with the screen.
  The "Add ticket and describe" button is disabled at six tickets, and the
  message appears in a `role="status"` paragraph. The message describes the
  last adjustment action, so it can differ from the ticket count after another
  control is used. `src/index.css` is the prepared stylesheet.
- `Demonstrations/snapshot-mismatch/movie-discovery` - the faulty version
  reproduced at the start of the lecture. Its message reads `quantity`, the
  snapshot of the render that created the running handler, so after one click
  the screen shows two tickets while the message still says 1. A temporary
  `console.log("Handler snapshot", quantity, "requested", nextQuantity);`
  shows both values in the browser console. It is a teaching copy; continue
  from `movie-discovery`, which has the corrected handler and no log.
- `Changes.diff` - the complete change to the project in this lecture.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it).
- `Setup.md` - the commands, and how to run a demonstration in its own folder.
- `Reference.md` - the lecture's key questions in short, with resources and
  further reading.
- `Thought Checks.md` - discussion questions with explained answers.

## Running a project

Open the project folder in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. Only one project can use
that address at a time, so stop one server (Ctrl+C) before starting another.
`npm run build` checks the types and builds into `dist`; `npm run lint` runs
oxlint.
