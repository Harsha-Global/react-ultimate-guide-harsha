# Objects & Properties — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-06-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## property-keys

```bat
node C:\react\lecture-06-demos\property-keys\app.js
```

Dot syntax uses a literal key; brackets evaluate the key expression. Both missing literal keys print undefined in this example.

```text
Travel Backpack
true
undefined
undefined
```

## const-reassignment

```bat
node C:\react\lecture-06-demos\const-reassignment\app.js
```

Intentionally broken: assignment attempts to replace a const binding. Keep it separate; changing a property is allowed by this binding.

```text
TypeError: Assignment to constant variable.
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
