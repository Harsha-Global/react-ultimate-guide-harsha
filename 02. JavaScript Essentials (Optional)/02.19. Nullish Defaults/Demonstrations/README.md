# Nullish Defaults — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-19-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## default-parameter

```bat
node C:\react\lecture-19-demos\default-parameter\app.js
```

The parameter default handles undefined but preserves explicit null. Nullish coalescing handles both null and undefined.

```text
1
null
1
```

## mixed-without-parentheses

```bat
node C:\react\lecture-19-demos\mixed-without-parentheses\app.js
```

Deliberate SyntaxError: ?? cannot mix directly with || without explicit parentheses.

```text
SyntaxError: Unexpected token '||'
```

## explicit-grouping

```bat
node C:\react\lecture-19-demos\explicit-grouping\app.js
```

(0 ?? false) || 1 produces 1; 0 ?? (false || 1) produces 0. Grouping changes which fallback decision runs.

```text
1
0
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
