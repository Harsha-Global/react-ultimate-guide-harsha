# Temporary return comparisons

These files are separate from the correct lecture-wise source in `javascript-essentials/app.js`. Copy this Demonstrations folder to `C:\react\arrow-functions-demos` on Windows.

## Missing return

The `missing-return/app.js` file contains the first three labels from the lecture with an intentionally missing `return` statement in the `getLineTotal` function's block body. Run:

```bat
node C:\react\arrow-functions-demos\missing-return\app.js
```

```text
Travel Backpack x 2: undefined
Travel Backpack x 3: undefined
Single item: undefined
```

The multiplication expression does not return itself from a block body. Restore the main function to:

```js
const getLineTotal = (price, count = 1) => price * count;
```

Save the main file and run `node app.js` from `C:\react\javascript-essentials`. Before adding the summary, its output is 50, 75 and 25 in the three original messages. After adding the summary, keep all four correct messages.

## Object block

Open the separate `object-block/app.js` file and run:

```bat
node C:\react\arrow-functions-demos\object-block\app.js
```

Its `=> { total: price * count }` syntax creates a block. Here `total:` is a statement label, not an object property. The function finishes without a return statement, so the output is `undefined`. Statement labels are shown only to explain this parsing trap; they are not a new coding pattern to use.

Use this exact one-property comparison. Removing parentheses from the main two-property object would produce a syntax error instead, so do not substitute that edit when expecting undefined.

## Object expression

The `object-expression/app.js` file wraps that object literal in parentheses, then reads its `total` property. Run:

```bat
node C:\react\arrow-functions-demos\object-expression\app.js
```

The output is `75`. The parentheses group the object expression; they do not call a function.

## Restore the recording view

The two object comparisons do not modify the main file. Return to `C:\react\javascript-essentials\app.js` in VS Code, and run `node app.js` in that project's integrated Command Prompt terminal. Verify all four messages, including `Summary: 3 items, total 75`. Keep the practice solution separate as well.
