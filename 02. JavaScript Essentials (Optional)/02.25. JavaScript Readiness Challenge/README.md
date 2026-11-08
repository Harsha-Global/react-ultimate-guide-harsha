# 02.25. JavaScript Readiness Challenge - source code

Everything demonstrated in this lecture, ready to run.

## Folders

- `javascript-essentials` - the main project at the end of this lecture and of
  the JavaScript Essentials section: the challenge worked through in full.
- `Checkpoints/Before readiness challenge` - the project as it stood at the end
  of 02.24. Async Error Handling, if you want to start the challenge yourself.
- `Demonstrations/save-failure` - the same challenge with the save asked to
  fail, so the calculation still succeeds but the outcome reports a failure.
- `Demonstrations/empty-selection` - a target id the basket does not contain,
  so the selection is empty, the total is zero and the save still succeeds.
- `Practice/starter` - your starting point for the challenge.
- `Practice/solution` - the complete solution with its explanation. Try the
  starter first.

## Running any of them

These are browser modules, so they need a local server rather than opening the
file directly. From inside the folder you want to run:

```
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

Open http://127.0.0.1:5500/ in Chrome and press Ctrl+Shift+J to see the
Console. Only one of these folders can use port 5500 at a time; stop the
running server before starting another.

## What each one prints

| Folder | Console output |
| --- | --- |
| javascript-essentials | Selected entries: 1 / Updated count: 5 / Selected total: 90 / Original total: 108 / Original first count: 4 / Closure prediction: 90, 80 / Save attempt finished / Saved total: 90 |
| Checkpoints/Before readiness challenge | Save attempt finished / Success: true, total: 108 / Save attempt finished / Success: false, message: Basket save failed |
| Demonstrations/save-failure | … Closure prediction: 90, 80 / Save attempt finished / Save failed: Basket save failed |
| Demonstrations/empty-selection | Selected entries: 0 / Updated count: 0 / Selected total: 0 / … / Saved total: 0 |
| Practice/starter | Selected entries: 2 / Updated count: 4 / Selected total: 0 / … / Closure prediction: 90, 80 |

The save is simulated with a timer. Nothing is sent to a server and no basket
is stored, and the original basket is never modified.
