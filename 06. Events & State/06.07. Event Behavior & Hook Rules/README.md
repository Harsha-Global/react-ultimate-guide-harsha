# 06.07. Event Behavior & Hook Rules - source code

Everything demonstrated in this lecture.

## Folders

- `movie-discovery` - the project as this lecture leaves it:
  - `src/EventLab.tsx` keeps `message` and `stopBubbling` state; the Stop
    bubbling checkbox is controlled with `checked={stopBubbling}` and reads
    `event.currentTarget.checked`; the parent event boundary's click handler
    appends " Parent handler." with a functional update; the Try bubbling
    button calls `event.stopPropagation()` when the checkbox is checked, then
    sets "Button handler."; the preview form's `handleSubmit(event:
    FormEvent<HTMLFormElement>)` calls `event.preventDefault()` and updates
    the status;
  - `src/index.css` adds the `.event-boundary` border;
  - `src/App.tsx` renders `<EventLab />` below the booking panel.
- `hook-examples/Hook Placement.md` - the separate comparisons shown in the
  lecture: `useState` inside a condition and inside an event handler (both
  wrong), and a top-level call before a conditional return (correct). They are
  deliberately kept out of the project's `src`.
- `Practice/Quiz.md` - the React UI Check quiz: props, keys, events, state and
  derived values. `Practice/Answers.md` explains each answer and names the
  lecture to revisit. Answer the quiz first.
- `Setup Guide.md` - the commands, the toolchain and recovery steps.

## Running the project

Open `movie-discovery` in VS Code, then in its Command Prompt terminal:

```
npm ci
npm run dev
```

`npm ci` installs the exact versions from `package-lock.json` (once per copy).
`npm run dev` starts the Vite development server; open the Local address it
prints (normally http://localhost:5173) in Chrome. `npm run build` checks the
types and builds into `dist`; `npm run lint` runs oxlint, whose configuration
turns `react/rules-of-hooks` into an error.

## What the Event behavior lab does

| Try | Status |
| --- | --- |
| Try bubbling, Stop bubbling unchecked | Button handler. Parent handler. |
| Try bubbling, Stop bubbling checked | Button handler. |
| Submit preview, or Enter in Preview note | Preview submitted without leaving the page. |
