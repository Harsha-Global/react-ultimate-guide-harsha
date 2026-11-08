# Complete solution — compare after your attempt

The complete runnable program is in `app.js`. Run `node app.js` from this solution folder's integrated Command Prompt terminal.

Only the `getLineSummary` function changes:

```js
const getLineSummary = (price, count = 1) => {
  return {
    count: count,
    total: getLineTotal(price, count)
  };
};
```

The first opening brace starts the function body. The `return` statement supplies an object to the caller. The second opening brace starts that object literal, which contains the same two properties. The `count` property receives the `count` parameter's value; the `total` property receives the number returned by the `getLineTotal` function. The `return` statement ends with a semicolon. The last closing brace ends the function body, and the final semicolon ends the variable declaration.

Keep the returned object's opening brace on the same line as the `return` keyword. A line break immediately after that keyword can end the return statement early and return undefined.

The `getLineTotal` function still uses an expression body. The default count and all callers are unchanged. This preserves:

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Summary: 3 items, total 75
```

This example could use either form. The original expression body is shorter; the block form is useful when separate statements make the operation clearer. Do not replace the main lecture source with the practice solution before the next lecture.
