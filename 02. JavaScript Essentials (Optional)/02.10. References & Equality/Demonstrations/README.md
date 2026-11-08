# References & Equality — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-10-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## primitive-copy

```bat
node C:\react\lecture-10-demos\primitive-copy\app.js
```

savedPrice retains the earlier number 15 after currentPrice is reassigned to 18.

```text
18
15
```

## reassignment

```bat
node C:\react\lecture-10-demos\reassignment\app.js
```

chosenProduct uses let and is redirected to a new object. firstProduct still reaches the original object; their prices are 15 and 18 and their identities differ.

```text
15
18
false
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
