# Practice — return the same object with a block body

## Brief

Rewrite the `getLineSummary` function from the “Arrow Functions” lecture using a block body and an explicit `return` statement. Preserve the behavior of the program.

## Familiar starter

Copy this Practice folder to `C:\react\arrow-functions-practice`. Open its `starter` subfolder in VS Code and edit the `app.js` file. This starter is the complete correct lecture source; all required syntax has been taught. Keep the main `C:\react\javascript-essentials` folder unchanged for the next lecture.

## Acceptance criteria

- Keep the `getLineSummary` function as an arrow function, with the same `price` and `count` parameters and the default count of `1`.
- Use a block body and explicitly return one object with the same `count` and `total` properties.
- Keep the call to the `getLineTotal` function for the calculated total; do not hard-code `75` or repeat the multiplication.
- Leave the `getLineTotal` function, existing variables, callers and four messages unchanged.
- Save with Ctrl+S and run `node app.js` in the starter folder's integrated Command Prompt terminal. All four output lines must match:

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Summary: 3 items, total 75
```

## Hints

1. The opening brace directly after the arrow now begins the function body.
2. Inside the body, use the `return` keyword followed by an object literal. Keep the object's opening brace on the same line as `return`.
3. You need one pair of braces for the function body and another pair for the object. The outer object-expression parentheses are no longer required after `return`.

## After your attempt

Compare with the complete implementation and explanation in the separate `solution` folder. This solution is packaged inside this lecture's Practice folder for the course GitHub repository. Use the “How to Download Source Code” article lecture in the Course Introduction section to find the repository route.

Explain why adding function-body braces without adding a return statement would change the result.
