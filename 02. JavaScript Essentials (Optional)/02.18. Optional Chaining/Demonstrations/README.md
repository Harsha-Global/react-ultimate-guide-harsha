# Optional Chaining — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-18-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## unguarded-delivery

```bat
node C:\react\lecture-18-demos\unguarded-delivery\app.js
```

The item exists but its delivery property does not. Reading city through undefined throws TypeError.

```text
TypeError: Cannot read properties of undefined (reading 'city')
```

## root-only-guard

```bat
node C:\react\lecture-18-demos\root-only-guard\app.js
```

The root check passes because item exists. Reading city through missing delivery still throws TypeError; guard the nullable level.

```text
TypeError: Cannot read properties of undefined (reading 'city')
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
