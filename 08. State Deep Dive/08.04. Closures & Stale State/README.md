# 08.04. Closures & Stale State - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/Quote.tsx` exports the `Quote` type (readonly guest name,
  showtime, quantity and total) and the `QuoteCard` component, which shows one
  captured quote ("Guest" when the name is empty) and notes that the values
  come from the moment of the request. `BookingPanel` adds the `isPreparing`
  and `quote` states. `handlePrepareQuote` copies the current name, showtime,
  quantity and total into a `requestedQuote` object, switches preparing on,
  clears the previous quote and schedules a `window.setTimeout` callback that
  stores that object after two seconds. The "Prepare quote" button is disabled
  while a quote is being prepared; the booking inputs stay editable, and the
  quote keeps the request-time choices. `src/index.css` is the prepared
  stylesheet.
- `Demonstrations/quote-observation/movie-discovery` - the same project with an
  eight-second delay (`8000` instead of `2000`), so you can change the booking
  before the quote appears: request Emily, 18:00, one ticket ($12), change to
  David, 21:00, three tickets ($45), and the quote still shows Emily's $12
  request. Its `README.md` has the steps.
- `Demonstrations/delayed-stale/movie-discovery` - a small lab that replaces
  `App`: "Add one after delay" schedules
  `setQuantity(Math.min(6, quantity + 1))` for two seconds later. Choose four
  tickets before it runs and the result is 2, because the callback calculates
  from the quantity it captured (1). This is the faulty version.
- `Demonstrations/delayed-fixed/movie-discovery` - the same lab with the fix
  made in the lecture: the callback passes an updater,
  `setQuantity(current => Math.min(6, current + 1))`, so the same sequence
  gives 5. Compare it with your repaired copy.
  The demonstrations are teaching copies; continue from `movie-discovery`.
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
Let a quote or delayed adjustment finish before you stop a server.
`npm run build` checks the types and builds into `dist`; `npm run lint` runs
oxlint.
