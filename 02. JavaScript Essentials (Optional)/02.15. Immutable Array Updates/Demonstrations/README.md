# Immutable Array Updates — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-15-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## array-copy-mutation

```bat
node C:\react\lecture-15-demos\array-copy-mutation\app.js
```

Spreading the outer array retains the item reference. The subsequent count assignment changes the shared item; the correct main update creates a new matching object.

```text
4
false
true
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
