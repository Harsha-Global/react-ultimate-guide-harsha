# 09.05. Accessible Forms & useId - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  Only `src/CustomerForm.tsx` changes. It imports `useId` next to
  `useState`, calls it once at the top of the component and keeps the
  result in `formId`, a prefix that belongs to this form instance. Each
  control's `id` and its label's `htmlFor` are that prefix plus a field
  suffix (`${formId}-fullName`, `-email`, `-arrivalMinutes`, `-city` and
  `-note`), so every label still names and focuses its own control. The
  `name` attributes are unchanged, because `readCustomerForm` reads the
  submission by name.
  Each error paragraph gets its own id (for example
  `${formId}-fullName-error`). While a field shows its error, the control
  has `aria-invalid` set to true and an `aria-describedby` that names that
  paragraph; without an error both attributes are `undefined`, so nothing
  points to a missing element. The arrival minutes and seating note hints
  are always shown, so their ids are always in `aria-describedby`, followed
  by a space and the error's id only while the error is shown
  (`aria-describedby` holds space-separated ids).
  A summary at the start of the form, "Please correct the fields marked
  below. Your input is preserved.", has `role="alert"`. It appears only
  after a submission attempt while errors remain
  (`attempted && hasErrors(errors)`), and it disappears once the current
  values are valid. The submission message keeps `role="status"`, the field
  messages stay plain descriptions, and `required`, the seating `legend` and
  `noValidate` are unchanged. Submit the empty form: the summary and the
  name and email messages appear. Type a name and an email address and the
  summary goes. Nothing is sent to a server. The other files are unchanged
  from 09.04; `src/index.css` is the prepared stylesheet.
- `Changes.diff` - the complete change to the project in this lecture
  (only `src/CustomerForm.tsx` changes).
- `Demonstrations/two-form-instances/movie-discovery` - the two-instance
  comparison: the lecture's project with `src/App.tsx` replaced by a page,
  "Independent customer forms", that renders a small `FormInstance`
  component twice ("First customer" and "Second customer"). Each
  `FormInstance` keeps its own draft state and renders the lecture's
  `CustomerForm`, so each form calls `useId` separately and gets its own
  prefix. Clicking the first form's Full name label focuses the first
  input, and the second form's label the second input. Submitting one form
  shows the summary and the messages in that form only. In Chrome DevTools
  (right-click an input, then Inspect), each input's `id` and
  `aria-describedby` use its own form's prefix. React generates the prefix,
  so don't rely on its exact text. Run it from a copy in its own folder
  under `C:\react` (the lecture uses `C:\react\two-form-instances-demo`);
  it never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it). It already has the hint, error,
  `aria-invalid` border, error summary and focus styles, and it is the same
  file as in 09.04, so if you continue from 09.04 your `src/index.css`
  already matches it and the copy changes nothing.
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
