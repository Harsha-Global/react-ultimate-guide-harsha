# 08.06. State Design - source code

Everything demonstrated in this lecture, and its practice exercise.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/quoteState.ts` exports the `QuoteState` type, a union with one
  object shape for each valid phase of preparing a quote: `idle`, `preparing`,
  and `ready`, which also requires the `quote`. `BookingPanel` replaces the
  separate `isPreparing` flag and nullable `quote` with one `quoteState` value
  that starts as `{ status: "idle" }`. `handlePrepareQuote` sets the
  preparing shape, and the timer later stores the ready shape with the quote
  captured at request time. The "Prepare quote" button, the preparation
  message and the quote card all check `quoteState.status`; inside the
  `ready` check TypeScript knows the quote is there. The ticket price, the
  current total, the cart total and the selected item are still calculated
  during rendering from the stored choices, while the completed quote keeps
  its own historical total. `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture.
- `Practice/C11` - the Stale Derived Values practice: the booking total stops
  following the quantity.
  - `Task.md` - the task and hints. Start here.
  - `Local/Starter/movie-discovery` - the project to fix: the lecture's
    project with `src/App.tsx` replaced by a small booking-total lab.
  - `Local/Solution/movie-discovery` - the complete solution. Try the starter
    before opening it.
  - `Solution.md` - the explanation.
  - `Native/Starter/App.jsx` and `Native/Solution/App.jsx` - the same starter
    and solution `App` as plain JSX files. Do not copy them into the
    TypeScript projects.
  Work on a copy of the starter in its own folder under `C:\react`; the
  practice never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it).
- `Setup.md` - the commands, and how to run a practice project in its own
  folder.
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
Let a quote finish before you stop the server.
`npm run build` checks the types and builds into `dist`; `npm run lint` runs
oxlint.
