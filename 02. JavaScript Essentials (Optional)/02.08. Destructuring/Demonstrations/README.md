# Destructuring — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-08-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## defaults

```bat
node C:\react\lecture-08-demos\defaults\app.js
```

The present price 0 and category null stay unchanged. Missing shippingNote and the absent second label use defaults. The original object still has no shippingNote property.

```text
Desk Lamp
0
null
Collection available
undefined
Travel Backpack
No second label
```

## skip-entry

```bat
node C:\react\lecture-08-demos\skip-entry\app.js
```

The leading comma skips index 0. middleProduct receives index 1, the Desk Lamp.

```text
Desk Lamp
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
