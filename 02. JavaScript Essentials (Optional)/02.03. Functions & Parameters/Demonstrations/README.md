# Function comparisons

These are separate, complete copies of the temporary comparisons shown in the “Functions & Parameters” lecture. The correct source for continuing the section is in `javascript-essentials/app.js`. Keep your main working folder separate.

To replay a comparison on Windows, copy this folder under `C:\react\functions-parameters-comparisons`. Open one comparison's subfolder in VS Code and run `node app.js` from its Command Prompt terminal.

## logging-only

This deliberately replaces `return price * count;` with `console.log(price * count);`. It prints:

```text
50
Travel Backpack x 2: undefined
75
Travel Backpack x 3: undefined
```

The number printed inside the function is separate from the value returned to the caller. With no return statement, this ordinary function returns `undefined`. The template literal therefore receives `undefined`.

The complete corrected function for this comparison is:

```js
function getLineTotal(price, count) {
  return price * count;
}
```

Keep the rest of the comparison unchanged, save, and run it again. Only the two product labels remain, with totals 50 and 75. The lecture's main source contains this correction plus the later default-count addition. The comparison is an intentionally wrong-result demo, not a runtime exception or a mapped coding exercise.

## default-values

This contains the correct lecture source plus two temporary comparison calls. It prints:

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Explicit undefined: 25
Zero items: 0
```

An omitted or explicitly `undefined` second argument uses the `count` parameter's default of `1`. The number `0` is a supplied argument and remains `0`. Remove the last two method calls to return to the three-message source used for the next lecture.
