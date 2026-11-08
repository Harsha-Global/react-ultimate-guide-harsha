# 02.24. Async Error Handling - source code

Everything demonstrated in this lecture, ready to run.

## Folders

- `javascript-essentials` - the main project at the end of this lecture.
  `save-flow.js` wraps the awaited save in `try` / `catch` / `finally` and
  returns an explicit `{ ok, ... }` record; `app.js` awaits both outcomes.
- `Checkpoints/Before async error handling` - the project as it stood at the
  end of 02.23. async/await, in case you want to type this lecture yourself.
- `Demonstrations/catch-rejection` - a `then` handler followed by `catch` on
  the returned promise, with the save asked to fail.
- `Demonstrations/recover-and-rethrow` - one catch handler that returns a
  record, and one that logs context and rethrows the same error.
- `Demonstrations/logging-only` - a catch handler that prints but returns
  nothing, so the next `then` callback receives `undefined`.
- `Exercise/starter` - your starting point for the coding exercise.
- `Exercise/solution` - the complete explained solution. Try the starter first.
- `Exercise/Udemy` - the same exercise as it is set up for the course platform.

## Running the browser projects

The main project, the checkpoint and the three demonstrations are browser
modules, so they need a local server rather than opening the file directly.
From inside the folder you want to run:

```
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

Open http://127.0.0.1:5500/ in Chrome and press Ctrl+Shift+J to see the
Console. Only one of these folders can use port 5500 at a time; stop the
running server before starting another.

## Running the exercise

`Exercise/starter` and `Exercise/solution` are self-contained, so they need no
server. From inside either folder:

```
node app.js
```

## What each one prints

| Folder | Output |
| --- | --- |
| javascript-essentials | Save attempt finished / Success: true, total: 108 / Save attempt finished / Success: false, message: Basket save failed |
| Checkpoints/Before async error handling | Before call / Inside: before await / After call / Inside: saved 108 / Caller received: 108 |
| Demonstrations/catch-rejection | Failed: Basket save failed |
| Demonstrations/recover-and-rethrow | Recovered outcome: false, Basket save failed / Adding context: … / Outer received: … |
| Demonstrations/logging-only | Only logged: Basket save failed / Next handler received: undefined |
| Exercise/solution | {"ok":true,"total":108} / {"ok":false,"message":"Basket save failed"} / {"ok":true,"total":0} |

The save is simulated with a timer. Nothing is sent to a server and no basket
is stored.
