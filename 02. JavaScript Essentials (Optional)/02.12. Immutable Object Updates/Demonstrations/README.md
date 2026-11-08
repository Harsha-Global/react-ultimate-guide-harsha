# Immutable Object Updates — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-12-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## shallow-mutation

```bat
node C:\react\lecture-12-demos\shallow-mutation\app.js
```

The new outer object still points to the original delivery object, so both city reads become Pune. This is an isolated defect demonstration.

```text
Pune
Pune
false
true
```

## lost-sibling

```bat
node C:\react\lecture-12-demos\lost-sibling\app.js
```

The new delivery object has only a city property, so its fee is undefined. The original fee remains 40.

```text
40
undefined
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
