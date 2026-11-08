# 08.05. Nested State Updates - source code

Everything demonstrated in this lecture.

## Folders and files

- `movie-discovery` - the movie booking project at the end of this lecture.
  The new `src/guest.ts` exports the `Guest` type (a readonly `name` and a
  nested readonly `contact` object with `city` and `email`), `createGuest`,
  which returns a new guest (empty name and email, city Seattle), and
  `changeCity`, which copies the changed path: a new guest object with a new
  `contact` object holding the new city, leaving the earlier objects intact.
  `BookingPanel` replaces the separate guest-name state with one `guest` state
  that uses `createGuest` as its initializer. The name input copies the guest
  with the new name, and the new City input calls `changeCity`, both through
  updaters; the quote and the booking summary read `guest.name`. The new
  "Latest show first" button sorts a copy of the cart
  (`[...current].sort(...)`), latest showtime first, so the state array is
  never sorted in place and unchanged cart items keep their object references.
  The selected show survives sorting because selection uses the showtime id,
  not an array position. `src/cart.ts` is unchanged: `changeCartQuantity`
  already replaces only the changed item. `src/index.css` is the prepared
  stylesheet.
- `Changes.diff` - the complete change to the project in this lecture.
- `Styles/booking.css` - the prepared stylesheet for this lecture (its
  `README.md` explains how to apply it).
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
