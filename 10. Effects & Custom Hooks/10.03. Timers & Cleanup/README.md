# 10.03. Timers & Cleanup - source code

Everything demonstrated in this lecture.

## Folders and files

- `focus-desk` - the Focus Desk project at the end of this lecture (the
  checkpoint the next lecture continues from). Compared with the starter it
  adds one file, `src/TimerPanel.tsx`, and changes two. `TimerPanel` keeps
  `remainingSeconds` (starting at `minutes * 60`) and `running` in state and
  owns one Effect: while the session is running and time remains, the setup
  schedules a single `window.setTimeout` tick of one second that stores
  `remainingSeconds - 1` (and stops the session at zero), and it returns
  `() => window.clearTimeout(timeoutId)` as its cleanup. The dependency array
  is `[running, remainingSeconds]`, so every tick, Pause and Reset first runs
  the cleanup (cancelling the pending timeout) and then, if still running,
  schedules the next one - no tick is ever left behind, and pausing holds the
  count. The panel renders the time in an `<output>` (`25:00` in Focus mode,
  `05:00` in Break mode), a Start/Pause button (disabled at zero), a Reset
  button and "Session complete." when the count reaches zero. `src/App.tsx`
  imports the panel and replaces the 25:00 placeholder of the previous lecture
  with `<TimerPanel key={mode} minutes={mode === "focus" ? 25 : 5} />`: the
  `key` makes switching between Focus and Break mount a fresh timer.
  `src/index.css` gains the six timer rules (`.timer`, `.time-display`,
  `.timer-actions` and its buttons).
- `Starter/focus-desk` - the starting point of this lecture: the completed
  project of 10.02 (Effect Dependencies), whose "Current focus" panel still
  shows the static 25:00 / 05:00 placeholder and has no `TimerPanel.tsx`.
  Open it to follow the lecture step by step.
- `Styles/focus-desk.css` - the prepared stylesheet the lecture copies into
  `src/index.css`. It is the starter's stylesheet plus the six timer rules;
  `focus-desk/src/index.css` already matches it byte for byte.
- `Setup.md` - the commands.
- `Reference.md` - the primary references (react.dev).
- `Reference Guide.html` - the concept diagram of the lecture ("A scheduled
  tick has a lifetime") with the references; the image it shows is
  `Blocks/1/1.1.png`.
- `Thought Checks.md` - what to predict and check in the running app.

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
In `focus-desk`, press Start and watch the count fall once a second, Pause to
hold it, Reset to return to the full session, and switch between Focus and
Break to get a fresh timer. `npm run check` checks the types, `npm run build`
checks them and builds into `dist`, and `npm run lint` runs oxlint (it prints
nothing when everything passes).
