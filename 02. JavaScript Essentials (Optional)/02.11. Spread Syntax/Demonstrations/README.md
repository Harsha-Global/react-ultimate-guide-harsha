# Spread Syntax — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-11-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## overwrite-order

```bat
node C:\react\lecture-11-demos\overwrite-order\app.js
```

Compare the two literal orders. The later value wins and the original remains unchanged.

```text
18
20
18
```

## shared-item

```bat
node C:\react\lecture-11-demos\shared-item\app.js
```

A deliberate property mutation through the copied array changes the shared object. Keep this demonstration separate.

```text
22
22
```

## call-spread

```bat
node C:\react\lecture-11-demos\call-spread\app.js
```

One array argument produces count 1; three expanded arguments produce count 3. The rest array is new, while its product objects retain identity.

```text
1
3
false
true
```

## plain-object-array

```bat
node C:\react\lecture-11-demos\plain-object-array\app.js
```

This deliberate invalid example throws TypeError because the plain object is not iterable. Use object-literal spread to copy its properties.

```text
TypeError: item is not iterable
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
