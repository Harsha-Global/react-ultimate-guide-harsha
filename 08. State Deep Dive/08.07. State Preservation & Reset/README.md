# 08.07. State Preservation & Reset - source code

Everything demonstrated in this lecture, and its practice exercise.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/BookingNote.tsx` is a component with its own `note` state: a
  controlled "Seating note" input, under a heading that shows the showtime it
  receives as a prop. It is declared at the top level of its file, so a parent
  render never creates a new component type. `BookingPanel` imports it, adds a
  `compact` state with a "Toggle compact note" button (an updater reverses the
  current value), and renders `<BookingNote key={showtime} showtime={showtime} />`
  inside a `div` that stays a `div` while its `className` switches between
  `compact` and `comfortable`. Toggling the layout keeps the typed note;
  choosing another showtime changes the key, so React starts a new note with
  empty state, while the quantity, cart and other booking state in
  `BookingPanel` stay. `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture.
- `Demonstrations/identity-lab/movie-discovery` - the isolated identity
  experiment: the lecture's project with `src/App.tsx` replaced by a small lab.
  "Change branch, same type" switches between two `BookingNote` branches that
  render the same component type in the same position, so the note is kept
  while the heading changes. "Change wrapper type" switches the wrapper
  between `section` and `article`, so the note starts again.
- `Practice/C15` - the State Identity practice: keep the chosen ticket
  quantity when only the layout changes, and reset it for another showtime.
  - `Task.md` - the task and hints. Start here.
  - `Local/Starter/movie-discovery` - the project to fix: the lecture's
    project with `src/App.tsx` replaced by a small ticket-picker lab.
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
- `Setup.md` - the commands, and how to run the demonstration and practice
  projects in their own folders.
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
