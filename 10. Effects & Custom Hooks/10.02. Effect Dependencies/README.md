# 10.02. Effect Dependencies - source code

Everything demonstrated in this lecture.

## Folders and files

- `focus-desk` - the Focus Desk project at the end of this lecture (the
  checkpoint the next lecture continues from). Compared with the starter it
  adds one file, `src/mode.ts` (`export type FocusMode = "focus" | "break";`),
  and changes three. `src/App.tsx` keeps the mode in state
  (`useState<FocusMode>("focus")`), renders a Focus/Break switch in the
  "Current focus" panel (two `type="button"` buttons whose `aria-pressed`
  reflects the state), shows `25:00` in Focus mode and `05:00` in Break mode,
  and passes `mode={mode}` to `FocusTitle`. `src/FocusTitle.tsx` still
  renders nothing and still owns the browser tab title through its one
  Effect, but the setup now reads two reactive values: in Focus mode it writes
  `` `${taskTitle} | Focus Desk` ``, in Break mode `Short break | Focus Desk`,
  and the dependency array is `[taskTitle, mode]`, so React runs the cleanup
  (which restores the previous title) and then the setup again whenever
  either value changes - selecting a task in Break mode re-runs the Effect
  even though that branch does not show the task's name, and switching back
  to Focus uses the latest selected task. Leaving `mode` out of the array
  would leave the mode part of the title stale; an empty array would freeze
  both. `src/index.css` gains the three `.mode-switch` rules.
- `Starter/focus-desk` - the starting point of this lecture: the completed
  project of 10.01 (When to Use Effects), whose `FocusTitle` reads only
  `taskTitle` and depends on `[taskTitle]`. Open it to follow the lecture
  step by step.
- `Styles/focus-desk.css` - the prepared stylesheet the lecture copies into
  `src/index.css`. It is the starter's stylesheet plus the three
  `.mode-switch` rules; `focus-desk/src/index.css` already matches it byte
  for byte.
- `Setup.md` - the commands.
- `Reference.md` - the primary references (react.dev).
- `Reference Guide.html` - the concept diagram of the lecture ("Dependencies
  describe reads") with the references; the image it shows is
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
In `focus-desk`, watch the tab title while you select tasks and switch between
Focus and Break. `npm run check` checks the types, `npm run build` checks them
and builds into `dist`, and `npm run lint` runs oxlint (it prints nothing when
everything passes).
