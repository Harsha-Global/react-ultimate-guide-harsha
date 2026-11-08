# Filtering & Finding — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-14-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## missing-property

```bat
node C:\react\lecture-14-demos\missing-property\app.js
```

The deliberate property read on a failed find result throws TypeError. Keep this comparison separate; the main file uses an explicit undefined guard.

```text
TypeError: Cannot read properties of undefined (reading 'name')
```

## search-order

```bat
node C:\react\lecture-14-demos\search-order\app.js
```

find visits p1 then p2 and stops. filter visits p1, p2 and p3, collecting two matching objects. Logging only exposes traversal for this temporary comparison.

```text
Inspect p1
Inspect p2
Desk Lamp
Inspect p1
Inspect p2
Inspect p3
2
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
