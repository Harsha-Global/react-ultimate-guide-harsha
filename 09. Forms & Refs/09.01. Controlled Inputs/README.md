# 09.01. Controlled Inputs - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/customer.ts` describes one customer draft: the `City`
  ("Seattle" or "Boston") and `Seating` ("aisle" or "center") types, the
  read-only `CustomerDraft` type (full name, email, city, arrival minutes,
  note, the email-updates choice and the seating choice),
  `createCustomerDraft`, which returns a new draft, and the `isCity` and
  `isSeating` checks. The arrival minutes stay a string while you edit, so an
  empty field stays empty instead of becoming zero. `App` now owns the draft
  (`useState(createCustomerDraft)`), shows the new `CustomerForm` in a
  "Customer details and preferences" panel, and passes `BookingPanel` a
  `guest` object made from the draft. The new `src/CustomerForm.tsx` is a
  controlled form with no state of its own: every field shows a value from
  `draft` and reports a changed copy of the draft through `onChange`. The
  text, email and number inputs and the textarea use `value`; the city
  `select` accepts only a valid city; the "Email booking updates" checkbox
  uses `checked`; and the two seating radio buttons share one `name` and are
  checked by comparing with `draft.seating`. A preview line under the form
  shows the current draft. `BookingPanel` no longer keeps its own guest state
  or the guest name and city inputs: it receives `guest` as a prop, and the
  booking summary and the quote read `guest.name`, so the name typed in the
  form appears there too. `src/index.css` is the prepared stylesheet, now
  with the customer-form rules.
- `Changes.diff` - the complete change to the project in this lecture.
- `Demonstrations/input-ownership/movie-discovery` - the input ownership
  comparison: the lecture's project with `src/App.tsx` replaced by a small
  page. "Controlled name" shows a value held in React state; "Uncontrolled
  name" starts from `defaultValue="Emily"` and then keeps whatever you type
  in the browser. "Set controlled name to David" changes the state, so only
  the controlled field changes, while the uncontrolled field keeps its edit.
  Run it from a copy in its own folder under `C:\react` (the lecture uses
  `C:\react\input-ownership`); it never replaces `movie-discovery`.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it).
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
