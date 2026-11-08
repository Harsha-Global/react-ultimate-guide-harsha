# 02.22. Promises - source code

Everything demonstrated in this lecture, ready to run.

## Folders

- `javascript-essentials` - the main project at the end of this lecture.
  `save.js` returns a promise; `app.js` attaches two `then` handlers.
- `Checkpoints/Before promises` - the project as it stood at the end of
  02.21. Closures, in case you want to type this lecture yourself.
- `Demonstrations/missing-return` - the first handler prints but returns
  nothing, so the next handler receives `undefined`.
- `Demonstrations/returned-promise` - the first handler returns a second
  save, so the next handler waits for it and receives its result object.
- `Demonstrations/rejected` - the request is asked to fail, and the second
  `then` callback receives the error.
- `Practice/starter` - your starting point for the practice task.
- `Practice/solution` - the complete solution. Try the starter first.

## Running any of them

These are browser modules, so they need a local server rather than opening
the file directly. From inside the folder you want to run:

```
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

Open http://127.0.0.1:5500/ in Chrome and press Ctrl+Shift+J to see the
Console. Only one of these folders can use port 5500 at a time; stop the
running server before starting another.

## What each one prints

| Folder | Console output |
| --- | --- |
| javascript-essentials | Before request / After request / Saved total: 108 / Next value: 109 |
| Demonstrations/missing-return | ... Saved total: 108 / Next value: undefined |
| Demonstrations/returned-promise | ... Saved total: 108 / Second save: 0 |
| Demonstrations/rejected | Request started / Failed: Basket save failed |
| Practice/solution | ... Saved total: 108 / Discounted value: 97.2 |

The save is simulated with a 400 ms timer. Nothing is sent to a server and
no basket is stored.
