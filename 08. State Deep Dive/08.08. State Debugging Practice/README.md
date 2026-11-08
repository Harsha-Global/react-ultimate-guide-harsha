# 08.08. State Debugging Practice - source code

Everything used in this lecture: the main project and the three debugging
investigations.

## Folders and files

- `movie-discovery` - the movie booking project. This lecture does not change
  it: it is exactly the project from the end of 08.07 (State Preservation &
  Reset), where `BookingNote` keeps its own note state and is rendered as
  `<BookingNote key={showtime} showtime={showtime} />` inside a wrapper whose
  class switches between `compact` and `comfortable`. Continue with this
  project in the next lecture. `src/index.css` is the prepared stylesheet.
- `Changes.diff` - a one-line comment: the main project has no changes in this
  lecture.
- `Practice` - the three investigations. `Practice/README.md` gives the order.
  - `mutation` - the cart snapshot investigation: adding an early-show ticket
    also changes the original receipt, because the copied array still points
    to the old item object. The solution copies the changed item as well
    (`current.map(...)` returning `{ ...item, quantity: ... }` for it).
  - `duplicated-total` - the booking total investigation: the total is stored
    in state from the first quantity, so it stops following the quantity. The
    solution calculates `total` from `quantity` during rendering.
  - `unstable-key` - the unexpected note reset investigation: the note's key
    includes the layout setting, so toggling the compact layout clears the
    typed note. The solution keys the note by the showtime only.
  Each folder has `Task.md` (the goal, the steps and the explanation - start
  there), `Starter/movie-discovery` (the project to investigate: the main
  project with `src/App.tsx` replaced by a small lab) and
  `Solution/movie-discovery` (the repaired project - try the starter first).
  Work on a copy of each starter in its own folder under `C:\react`; the
  practice never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it).
- `Setup.md` - the commands, and how to run a practice project in its own
  folder.
- `Reference.md` - what each fix must achieve, with resources and further
  reading.
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
Reload the browser before each fresh run of an investigation.
`npm run build` checks the types and builds into `dist`; `npm run lint` runs
oxlint.
