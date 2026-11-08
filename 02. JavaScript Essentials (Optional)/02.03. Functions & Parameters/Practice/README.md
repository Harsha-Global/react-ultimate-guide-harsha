# Try another function call

## Brief

Use the correct product-label starter from the “Functions & Parameters” lecture. Add a fourth output line that uses the `getLineTotal` function to calculate the total for four items, at the existing unit price.

## Familiar starter

Copy this `Practice` folder under `C:\react\functions-parameters-practice`. Open `C:\react\functions-parameters-practice\starter` in VS Code and edit its `app.js` file. Keep `C:\react\javascript-essentials` unchanged for the next lecture.

The starter is the complete correct lecture source, including the function declaration and three existing messages. All syntax needed for this task has been taught.

## Acceptance criteria

- Keep the existing function body, its default count, and the three current messages unchanged.
- Add one call to the `log` method on the `console` object, after the existing messages.
- Use a template literal with the message prefix `Four items:`.
- Calculate its total by calling the `getLineTotal` function with the `unitPrice` variable and the number `4`; do not hard-code the returned total or repeat the multiplication.
- Predict the new total before running the file.
- Save with Ctrl+S and run `node app.js` in a Command Prompt terminal in the starter folder. The new last line should be `Four items: 100`.

## Hints

1. Reuse the single-item message as a guide for placing a function call inside a template literal.
2. Supply both arguments in the call; the first argument supplies the `price` parameter, and the second supplies the `count` parameter.
3. The new call uses its own count argument. You do not need to reassign the outer `quantity` variable.

## After your attempt

Open the separate `solution` folder for the full implementation and explanation. Run its `app.js` file and compare all four output lines. The complete answer is packaged in this lecture's Practice folder for the course GitHub repository.

Explain why the new call returns 100 even though the function's default count is 1.
