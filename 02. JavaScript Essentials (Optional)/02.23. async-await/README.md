# 02.23. async/await - source code

Everything demonstrated in this lecture, ready to run.

## Folders

- `javascript-essentials` - the main project at the end of this lecture.
  `showSavedTotal` is an async function that awaits `saveBasket`, and the
  caller still uses `then` on the promise it returns.
- `Checkpoints/Before async-await` - the project as it stood at the end of
  02.22. Promises, in case you want to type this lecture yourself.
- `Demonstrations/immediate-return` - an async function that simply returns
  a number, showing that the call still hands back a promise.
- `Demonstrations/without-await` - the save call assigned straight to a
  variable named `result`, so reading `result.total` gives `undefined`.
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
| javascript-essentials | Before call / Inside: before await / After call / Inside: saved 108 / Caller received: 108 |
| Checkpoints/Before async-await | Before request / After request / Saved total: 108 / Next value: 109 |
| Demonstrations/immediate-return | Is a promise: true / After attaching handler / Received: 7 |
| Demonstrations/without-await | Immediate property: undefined / Later total: 108 |
| Practice/solution | ... Inside: saved 108 / Caller received: 97.2 |

The save is simulated with a 400 ms timer. Nothing is sent to a server and
no basket is stored.
