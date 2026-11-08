# 09.07. Form Defaults & Reset - source code

Everything demonstrated in this lecture, and its practice exercise.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  Only `src/CustomerForm.tsx` changes. It imports the existing
  `createCustomerDraft` from `./customer` and passes the function itself to
  `useState` to create a `baseline` state: the values Reset restores, which
  start as a new customer's defaults. The fixed `initialDraft` object is gone,
  and the "Draft has changes." / "Draft matches its defaults." line now
  compares the draft with `baseline`. `resetToBaseline` sends a fresh copy,
  `{ ...baseline }`, through the `onChange` prop (in `App` that is the
  draft's state setter, so the values come back through the `draft` prop),
  then clears the touched fields, the attempted flag, the "Last submitted
  details" receipt and the status message; replacing the draft alone would not
  clear that other state. `loadEmily` builds Emily Carter's sample details
  (Boston, 20 minutes, center seating) in a local `next` value, stores it as
  the new baseline with `setBaseline(next)`, sends a copy of the same `next`
  as the draft, and clears the same feedback. It uses `next` for both because
  this running handler still sees the old `baseline`. The Clear seating note
  button is replaced by "Reset customer details" and "Load Emily's defaults",
  both `type="button"`. Try it: load Emily's defaults ("Draft matches its
  defaults."), change the city and the name, and submit an invalid email: the
  other edits stay and the Email field gets focus. Correct it and submit, then
  edit again: the receipt keeps the submitted details. Reset: Emily's defaults
  return, the feedback clears, and the ticket quantity and cart stay as they
  were. The sample values are in the source; nothing is fetched or sent to a
  server. The other files are unchanged from 09.06; `src/index.css` is the
  prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture (only
  `src/CustomerForm.tsx`: the import, the `baseline` state, the dirty
  comparison, `resetToBaseline`, `loadEmily` and the two buttons).
- `Demonstrations/initial-defaults/movie-discovery` - the defaults
  comparison: the lecture's project with `src/App.tsx` replaced by a small
  page, "Initial values and explicit reset". `NameField` initializes its own
  state from an `initialName` prop and shows it in a controlled input; beside
  it, a browser-owned input receives `defaultValue`. Both sit in a
  `<section>` whose `key` comes from a separate reset counter. Type a new
  name into both fields, then click "Change supplied default": the prop
  changes from Emily to David, but both fields keep your edits, because an
  initial value only sets how a field starts. Click "Reset field instances":
  the key changes, React replaces the section and the fields inside it, and
  both start again from David. Run it from a copy in its own folder under
  `C:\react` (the lecture uses `C:\react\initial-defaults-demo`); it never
  replaces `movie-discovery`.
- `Practice/L01` - the Accessible Validation practice (optional).
  - `Task.md` - the task, the acceptance checks and two hints. Start here.
  - `Starter/movie-discovery` - the project to work in: the lecture's final
    project except `src/CustomerForm.tsx`, where the field names are plain
    `<span>` text instead of labels, and there are no refs, no focus after a
    failed submission, no `aria-invalid` or `aria-describedby`, and no `role`
    on the error summary or the status message. Validation, defaults and
    Reset already work.
  - `Solution/movie-discovery` - the complete solution (the same files as
    `movie-discovery`). Try the starter before opening it.
  Both are complete React projects: run each from a copy in its own folder
  under `C:\react` with `npm ci` and `npm run dev` (the lecture uses
  `C:\react\practice-09-07`, with `Task.md` beside the starter's files); the
  practice never replaces `movie-discovery`. The same starter and solution
  serve the optional assignment after Section 09.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It is the same file as in 09.06, so
  if you continue from 09.06 your `src/index.css` already matches it and the
  copy changes nothing.
- `Setup.md` - the commands, and how to run the demonstration and the
  practice in their own folders.
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
