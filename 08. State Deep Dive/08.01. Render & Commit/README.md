# 08.01. Render & Commit - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  `App` no longer renders the Event Lab (its import is gone too; the unused
  `src/EventLab.tsx` file stays in the folder) and the booking panel's heading
  reads "Configure your Skyward booking". `BookingPanel` owns the `quantity`
  state; `TicketControls` receives it together with the `onQuantityChange`
  callback, and `BookingSummary` receives the calculated total. The handlers
  only request state changes; React renders with the new state and commits
  the needed DOM changes. `src/index.css` is the prepared stylesheet.
- `Demonstrations/render-trace/movie-discovery` - a separate copy of the same
  project with one temporary line in `BookingPanel`:
  `console.log("BookingPanel render", { quantity, guestName, showtime });`.
  Open the browser console, then change the quantity to see React call the
  component again. The project keeps StrictMode, so development can add extra
  calls: the number of messages is not a count of clicks or of DOM commits.
  It is a teaching copy; continue from `movie-discovery`, which has no
  diagnostic log.
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
