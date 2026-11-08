# Try a quantity change

## Brief

Use the familiar product-label code from the “Variables & Expressions” lecture. Keep the initial quantity at two. Change only the later quantity reassignment, from three to four. Predict both output lines before running the file.

## Familiar starter

Copy this `Practice` folder under `C:\react\variables-expressions-practice`. Open its `starter` subfolder in VS Code. Edit `C:\react\variables-expressions-practice\starter\app.js`; keep your main `C:\react\javascript-essentials` folder unchanged.

The starter is the correct lecture source. No new syntax, dependencies, test tools or intentionally broken code is included.

## Acceptance criteria

- Keep the `productName` variable as `"Travel Backpack"` and the `unitPrice` variable as the number `25`.
- Keep the initial declaration `let quantity = 2;` unchanged.
- Change the later assignment to `quantity = 4;`.
- Keep the multiplication expressions and both template literals; do not replace calculated totals with hard-coded numbers.
- Save with Ctrl+S, then run `node app.js` from the Command Prompt terminal inside the starter folder.
- The first line remains `Travel Backpack x 2: 50`; the second line becomes `Travel Backpack x 4: 100`.

## Hints

1. Find the later line that changes the existing `quantity` variable. It does not repeat the `let` keyword.
2. The first `log` method call runs before that line; the second call runs after it.
3. If the old output remains, save the correct file and run it again. Inspect the newest pair of output lines.

## After your attempt

Open the separate `solution` folder for the complete answer, then run its `app.js` file and compare with your attempt. The answer and explanation are supplied in this lecture's Practice folder for the course GitHub repository.

Explain in your own words: why does changing the later assignment affect only the second line?
