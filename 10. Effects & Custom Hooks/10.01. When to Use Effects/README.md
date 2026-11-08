# 10.01. When to Use Effects - source code

Everything demonstrated in this lecture.

## Folders and files

- `focus-desk` - the Focus Desk project at the end of this lecture (the
  checkpoint the next lecture continues from). Compared with the starter it
  adds one file, `src/FocusTitle.tsx`, and two lines in `src/App.tsx`.
  `FocusTitle` renders nothing (`return null`): its only job is to own the
  browser tab title through one Effect. The Effect's setup remembers
  `document.title` and sets it to `` `${taskTitle} | Focus Desk` ``; its
  cleanup puts the previous title back; the dependency array `[taskTitle]`
  makes React run the cleanup and then the setup again only when the selected
  task's title changes. `App` renders
  `<FocusTitle taskTitle={selectedTask?.title ?? "Choose a task"} />` before
  `<main>`, so selecting a task, or adding one (which also selects it),
  changes the tab title, while typing in the "Add a task" field or ticking a
  checkbox does not. Everything else - the task list, the "Add a task" form,
  the open-task count and the "Current focus" panel - is computed from state
  during render or changed in event handlers, exactly as in the starter:
  the Effect is used only for the value that lives outside React,
  `document.title`.
- `Starter/focus-desk` - the starting point of this lecture: the same
  project without `FocusTitle`. Open it to follow the lecture step by step.
- `Styles/focus-desk.css` - the prepared stylesheet the lecture copies into
  `src/index.css`. Both projects' `src/index.css` already match it byte for
  byte, so copying it changes nothing.
- `Setup.md` - the commands.
- `Reference.md` - the primary references (react.dev).
- `Reference Guide.html` - the two concept diagrams of the lecture ("Three
  causes, three homes" and "One title owner") with the references; the images
  it shows are `Blocks/2/2.1.png` and `Blocks/4/4.1.png`.
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
In `focus-desk`, watch the tab title while you select tasks. `npm run check`
checks the types, `npm run build` checks them and builds into `dist`, and
`npm run lint` runs oxlint (it prints nothing when everything passes).
