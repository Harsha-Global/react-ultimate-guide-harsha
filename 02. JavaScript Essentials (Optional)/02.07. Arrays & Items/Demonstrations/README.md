# Arrays & Items — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-07-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## index-boundary

```bat
node C:\react\lecture-07-demos\index-boundary\app.js
```

The last valid index is 2. A missing index read returns undefined without throwing.

```text
3
Water Bottle
undefined
```

## missing-item-property

```bat
node C:\react\lecture-07-demos\missing-item-property\app.js
```

Intentionally broken: .name is read from the missing item, so the property access throws. The main list remains correct.

```text
TypeError: Cannot read properties of undefined (reading 'name')
```

## replace-item

```bat
node C:\react\lecture-07-demos\replace-item\app.js
```

This comparison replaces index 1 with Reading Lamp and leaves length 3. It is separate from the main source and from later immutable-update patterns.

```text
Reading Lamp
3
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
