# 09.04. Touched, Dirty & Submission State - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  Only `src/CustomerForm.tsx` changes. The stored `errors` state from 09.03
  is gone: `errors` is now calculated during every render by calling
  `validateCustomer(draft)` with the current draft, so there is no second
  copy to keep in sync (the `setErrors` call and the `FieldErrors` import are
  removed). Two new pieces of state remember interaction history:
  - `touched`, a `Partial<Record<keyof CustomerDraft, boolean>>` that starts
    as `{}`. `markTouched(field)` copies the current map in a state updater
    and sets that field's entry to `true`. The Full name, Email, Minutes
    before show and Seating note controls call it from `onBlur`, so a field
    becomes touched when focus leaves it, even if its value never changed.
  - `attempted`, which starts as `false`. Once the form has been read,
    `handleSubmit` sets it to `true`, then still accepts or rejects the
    details with its local `nextErrors`, as in 09.03.
  Each field shows its current error only when that field is touched or a
  submission was attempted, for example
  `(touched.fullName || attempted) ? errors.fullName : undefined`.
  The new `dirty` value compares every draft property with `initialDraft`
  (the same values `createCustomerDraft` returns) using
  `Object.keys(...).some(...)`, and a new line under the draft summary shows
  "Draft has changes." or "Draft matches its defaults.". `dirty` only drives
  that line: it does not mean the details are valid, submitted or saved, and
  submitting does not restore the defaults, so a submitted draft can still
  be dirty. Try it: after a reload no field messages appear. Leave the empty
  Full name and "Enter your full name." appears; type a name and it clears
  without submitting; delete the name again and the message returns, while
  the draft line goes back to "Draft matches its defaults." (touched, but not
  dirty). Submitting shows the remaining invalid fields, such as the empty
  email, and keeps everything you entered. Nothing is sent to a server. The
  other files are unchanged from 09.03; `src/index.css` is the prepared
  stylesheet.
- `Changes.diff` - the complete change to the project in this lecture (only
  `src/CustomerForm.tsx` changes).
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It is the same file as in 09.03, so
  if you continue from 09.03 your `src/index.css` already matches it and the
  copy changes nothing.
- `Setup.md` - the commands for running the project.
- `Reference.md` - the lecture's key questions in short, with resources and
  further reading.
- `Thought Checks.md` - discussion questions with explained answers.

## Running the project

Open the `movie-discovery` folder in VS Code, then in its Command Prompt
terminal:

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
