# 09.03. Form Validation - source code

Everything demonstrated in this lecture, and its practice exercise.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/validateCustomer.ts` exports the `FieldErrors` type (an
  optional message for `fullName`, `email`, `arrivalMinutes` and `note`),
  `validateCustomer` and `hasErrors`. `validateCustomer` receives a
  `CustomerDraft`, never changes it, and returns one message for each
  invalid field, or an empty object when every rule passes:
  - the full name must not be blank after trimming;
  - the email must have the simple `name@domain.suffix` shape (a course
    rule, not proof that the address exists);
  - the arrival minutes must not be blank and must be a whole number from
    0 to 60, so zero (arriving at showtime) is accepted. The blank check comes
    first because `Number("")` is 0;
  - the optional note may have up to 200 characters.
  `hasErrors` reports whether an errors object has any message.
  `src/CustomerForm.tsx` adds an `errors` state. After `readCustomerForm`
  returns a candidate, `handleSubmit` calls `validateCustomer`, stores the
  result with `setErrors`, and decides with the same local `nextErrors`
  value: the `errors` state still holds this render's snapshot until the next
  render. With errors, the status line shows "Check the highlighted customer
  details." and the handler returns, so the draft stays for correction and
  the "Last submitted details" receipt is not replaced; otherwise the details
  are submitted locally as before. Each field shows its message in a
  `<p className="error">` directly under its control. The inputs also gain
  `required` (and `min="0" max="60" step="1"` for the minutes), and the form
  has `noValidate`, so the browser does not block the submission and the
  custom messages appear instead. Clear the name, email and minutes and
  submit: all three messages appear together. 0 and 60 are accepted; 61 and
  1.5 are rejected. Nothing is sent to a server. The other files are
  unchanged from 09.02; `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture
  (`src/CustomerForm.tsx` changed, `src/validateCustomer.ts` new).
- `Demonstrations/browser-validation/movie-discovery` - the browser
  validation comparison: the lecture's project with only `noValidate`
  removed from the form in `src/CustomerForm.tsx`. With the browser's own
  constraint validation active, submitting the empty form is blocked before
  the submit handler runs: the browser focuses Full name and shows its own
  message (in Chrome, "Please fill out this field."), and none of the custom
  messages appear. Run it from a copy in its own folder under `C:\react`
  (the lecture uses `C:\react\browser-validation-demo`); it never replaces
  `movie-discovery`.
- `Practice/C16` - the Validation Functions practice: implement the same
  kind of validation function in a small TypeScript project.
  - `Task.md` - the task, the rules and two hints. Start here.
  - `Local/Starter` - the folder to work in: `validation.ts` (the types and
    a `validateCustomer` that returns no errors yet), `check.ts` (the checks),
    `tsconfig.json` and `README.md`.
  - `Local/Solution` - the same files with the complete `validation.ts`.
    Try the starter before opening it.
  This is not a React project: there is no `package.json` and no `npm ci`.
  Each folder's `README.md` has the commands: `npx tsc -p .` compiles the
  TypeScript into `dist`, then `node dist/check.js` prints PASS or FAIL for
  each case. The starter compiles but fails the checks until you implement
  the rules; the solution passes them all. Work on a copy in its own folder
  under `C:\react` (the lecture uses `C:\react\practice-09-03`); the
  practice never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It already has the `.error` style
  and is the same file as in 09.02, so if you continue from 09.02 your
  `src/index.css` already matches it and the copy changes nothing.
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
