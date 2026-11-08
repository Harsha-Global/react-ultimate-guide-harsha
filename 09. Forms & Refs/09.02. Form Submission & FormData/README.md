# 09.02. Form Submission & FormData - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/readCustomerForm.ts` exports `readCustomerForm`, which
  receives a `FormData` object and returns either a complete `CustomerDraft`
  or `null`. It reads each entry with `data.get(...)` using the controls'
  `name` attributes (`fullName`, `email`, `city`, `arrivalMinutes`, `note`,
  `seating` and `updates`). Because `get` can return a string, a `File` or
  `null`, it checks the actual values instead of asserting a type: every text
  entry must be a string, the city and seating must pass `isCity` and
  `isSeating`, and the updates entry must be missing (an unchecked checkbox
  sends nothing) or `"yes"`, which makes `updates` true. `null` means the
  form's fields could not be collected as expected.
  `src/CustomerForm.tsx` is now a `form` element with an `onSubmit` handler.
  `handleSubmit` calls `event.preventDefault()` (no page navigation), builds
  `new FormData(event.currentTarget)` and passes it to `readCustomerForm`.
  A `null` result shows "The form could not be read. Check its named
  controls."; otherwise the result is stored in the new `submitted` state and
  the status line shows "Customer details submitted locally. No reservation
  was sent." The "Submit customer details" button has `type="submit"`, so
  pressing Enter in a field such as Full name submits the form too; "Clear
  seating note" has `type="button"`, so it clears the note without
  submitting. The "Last submitted details" receipt reads `submitted`, while
  the draft preview still reads `draft`: submit Emily, change the name to
  David, and the preview changes while the receipt still shows Emily.
  Nothing is sent to a server. The other files are unchanged from 09.01;
  `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture
  (`src/CustomerForm.tsx` changed, `src/readCustomerForm.ts` new).
- `Demonstrations/uncontrolled-form/movie-discovery` - the uncontrolled
  comparison: the lecture's project with `src/App.tsx` replaced by a small
  page, "Submit a browser-owned form". Its fields are not kept in React state:
  `defaultValue` and `defaultChecked` only set the starting values (Emily,
  Seattle, updates checked), the browser keeps your edits, and the submit
  handler reads them with `FormData` when the form is submitted. Change the
  name to David, clear the checkbox and press Enter: the status line shows
  "David / Seattle / updates: no". "Unnamed field" has no `name` and
  "Disabled field" is disabled, so neither is collected. "Reset browser
  fields" restores the starting values, but the receipt keeps the last
  submission. Run it from a copy in its own folder under `C:\react` (the
  lecture uses `C:\react\uncontrolled-form-demo`); it never replaces
  `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It is the same file as in 09.01, so
  if you continue from 09.01 your `src/index.css` already matches it and the
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
