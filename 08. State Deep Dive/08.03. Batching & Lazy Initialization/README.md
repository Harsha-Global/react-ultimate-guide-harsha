# 08.03. Batching & Lazy Initialization - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  `BookingPanel` gains `handleEveningForTwo`, connected to the "Evening for
  two" button: one click requests three changes (`setQuantity(2)`,
  `setShowtime("21:00")` and the adjustment message), and React can batch them
  and process the resulting render work together. The new
  `src/starterCart.ts` exports `createStarterCart`, which returns fresh copies
  of two local sample rows (18:00 and 21:00, one ticket each). The cart state
  receives the function itself as its initializer,
  `useState<CartItem[]>(createStarterCart)`, so React calls it when it
  initializes the state and later renders reuse the stored cart.
  `src/index.css` is the prepared stylesheet.
- `Demonstrations/update-queue/movie-discovery` - a small lab that replaces
  `App` to show the update queue. Starting from 1, "Replace, then update"
  queues `setQuantity(5)` and then an updater that adds one (capped at six),
  giving 6; "Replace last" queues the same two and then `setQuantity(2)`,
  giving 2; "Reset to one" returns to 1.
- `Demonstrations/eager-initializer/movie-discovery` - calls the factory while
  rendering, `useState<CartItem[]>(createStarterCart())`, with a temporary
  `console.log("createStarterCart called");` inside it. Typing in the Guest
  name field logs new messages: the call runs on every render, even though
  React ignores its result after the first one.
- `Demonstrations/lazy-initializer/movie-discovery` - the same log, with the
  function passed as the initializer as in the main project; ordinary
  re-renders log nothing new.
  In both initializer copies the project keeps StrictMode, so development may
  call a pure initializer more than once; the log is for observation only, and
  the main project's factory has none. The demonstrations are teaching copies;
  continue from `movie-discovery`.
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
