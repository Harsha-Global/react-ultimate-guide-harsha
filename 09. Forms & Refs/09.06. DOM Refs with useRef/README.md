# 09.06. DOM Refs with useRef - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  Only `src/CustomerForm.tsx` changes. It imports `useRef` next to
  `useState` and `useId` and creates four refs, each starting as `null`:
  `nameRef`, `emailRef` and `minutesRef` hold an `HTMLInputElement`, and
  `noteRef` holds an `HTMLTextAreaElement`. The Full name, Email and Minutes
  before show inputs and the Seating note textarea receive them with
  `ref={...}`. React sets a ref's `current` to its element once the element
  is on the page, and back to `null` when it is removed, which is why each
  type includes `null`. The fields' values still come from `draft` through
  `value` and `onChange`: the refs are used only to move focus, never to read
  or change what a field shows. When validation fails, `handleSubmit` shows
  "Check the highlighted customer details." and then, before `return`, an
  `if` / `else if` chain focuses the first invalid control in form order:
  full name, then email, then arrival minutes, then the note. Only one branch
  runs; `current?.focus()` skips the call if that ref is still `null`, but it
  does not move on to the next field. Focus moves only in the submit handler,
  never while rendering, typing or leaving a field. Submit the empty form and
  the page moves to Full name; enter a name and an email without `@`, and the
  next submit moves to Email; minutes such as 75 and a note of 201 characters
  are reached the same way. Nothing is sent to a server. The other files are
  unchanged from 09.05; `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture (only
  `src/CustomerForm.tsx`: the `useRef` import, the four refs, the four `ref`
  attributes and the focus chain).
- `Demonstrations/ref-state-local/movie-discovery` - the lifetime comparison:
  the lecture's project with `src/App.tsx` replaced by a small page, "Local,
  ref and state". "Increase local and ref" adds 1 to a local variable
  (`localClicks`) and to a ref (`clicksRef.current`) without requesting a
  render, so nothing on the page changes. "Capture stored values" copies both
  into state, and the report shows them. Click "Increase local and ref" three
  times, then "Capture stored values": "Captured local: 3; captured ref: 3".
  Click "Request another render", then capture again: "Captured local: 0;
  captured ref: 3". Every render (including the one the capture itself
  requested) starts a new `localClicks` at 0, while the same ref object keeps
  its value; what the page shows comes from state. `npm run lint` reports two
  `react(immutability)` warnings for `localClicks` in this project on purpose:
  they flag the local-variable mistake the page demonstrates. Run it from a
  copy in its own folder under `C:\react` (the lecture uses
  `C:\react\ref-state-local-demo`); it never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It is the same file as in 09.05, so
  if you continue from 09.05 your `src/index.css` already matches it and the
  copy changes nothing.
- `Setup.md` - the commands, and how to run the demonstration in its own
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
