# Totals with reduce — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-16-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## trace-accumulator

```bat
node C:\react\lecture-16-demos\trace-accumulator\app.js
```

The block callback logs each transition, then explicitly returns nextTotal. The returned value feeds the next step; console.log is only observation.

```text
Index 0: 0 + 72 = 72
Index 1: 72 + 36 = 108
Returned total: 108
```

## no-initial-nonempty

```bat
node C:\react\lecture-16-demos\no-initial-nonempty\app.js
```

Already-calculated numeric amounts can use the first entry as the accumulator. Here 72 starts the total and 36 is added.

```text
108
```

## no-initial-empty

```bat
node C:\react\lecture-16-demos\no-initial-empty\app.js
```

Deliberate failure: an empty array has neither a supplied initial value nor a first entry to use. The reduce method throws TypeError.

```text
TypeError: Reduce of empty array with no initial value
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
