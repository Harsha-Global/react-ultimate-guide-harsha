# Rest Parameters — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-09-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## array-argument

```bat
node C:\react\lecture-09-demos\array-argument\app.js
```

The rest array contains one entry, whose value is the original three-product array. The logged outer count, outer length and inner length are 1, 1 and 3.

```text
1
1
3
```

## rest-position

```bat
node C:\react\lecture-09-demos\rest-position\app.js
```

Intentionally invalid syntax: a parameter follows the rest parameter. Parsing fails before any logging or function execution.

```text
SyntaxError: Rest parameter must be last formal parameter
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
