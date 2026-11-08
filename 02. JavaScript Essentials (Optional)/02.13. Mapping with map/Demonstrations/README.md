# Mapping with map — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-13-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## missing-return

```bat
node C:\react\lecture-13-demos\missing-return\app.js
```

Compare a block body that only evaluates item.name with a block that returns it. The first result is undefined until the return statement supplies the string.

```text
3
undefined
Travel Backpack
```

## callback-mutation

```bat
node C:\react\lecture-13-demos\callback-mutation\app.js
```

This deliberate assignment mutates a shared object inside the callback. A new result array does not undo that mutation.

```text
20
false
true
```

## empty

```bat
node C:\react\lecture-13-demos\empty\app.js
```

No input entries means no callback calls and an empty map result.

```text
0
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
