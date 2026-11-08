# Callback Timing — repair the sale-summary helper

This exercise follows the “Callbacks” lecture. Use either the course's native coding exercise or this equivalent local starter; a second attempt is not required.

## Task

The sale-summary helper fails before it can return a summary. Repair the getSaleSummary function so it uses the existing summary-building function correctly.

The supplied getLineTotal function calculates the regular total. The getDiscountedTotal function calculates a ten-percent discount. The trace version of the getLineSummary function logs its start, calls its pricing function, logs completion, and returns an object. These functions match the Callbacks lecture.

The new getSaleSummary function is a short helper with an expression body. Its price and count parameters supply the inputs. Its calculatePrice parameter has the getDiscountedTotal function as its default. Its intended job is to send those inputs and that pricing choice to the existing getLineSummary function, and return the resulting object.

1. Reproduce: run the starter and inspect the error. For the local route below, run node app.js and inspect the terminal output.
2. Locate: compare the getSaleSummary function with the getLineSummary function. Identify which expression supplies the third argument.
3. Fix: change only the getSaleSummary function. Preserve its parameters and defaults. Keep the other functions, their log messages, and the object property names unchanged. Use the existing summary function; do not hard-code an object or total.
4. Verify: a price of 30 and a count of 2 must return an object with count 2 and total 54. The discount must run exactly once, after Summary started and before Summary completed. The native checks also try a default count of 1, a count of 0, different numeric inputs and another pricing function.
5. Explain: in your own words, state what the summary function receives as its third argument, and which function controls when the pricing calculation runs.

Keep the main javascript-essentials project unchanged. Read the hints if needed; open the solution explanation after your attempt.

## Local route

Copy this exercise folder to `C:\react\callback-timing-practice`. Open its `starter` subfolder in VS Code. Save `app.js` with Ctrl+S, then run `node app.js` in that folder's integrated Command Prompt terminal. No package installation or test framework is required.

The supplied starter deliberately prints `Discount calculated`, then `Summary started`, and stops with `TypeError: calculatePrice is not a function`. Stack trace paths and line numbers vary.

After the repair, run the same command and compare all four lines:

```text
Summary started
Discount calculated
Summary completed
Sale summary: 2 items, total 54
```

For extra manual checks, temporarily change the driver call to `getSaleSummary(30)` and expect one item with total 27; then try `getSaleSummary(30, 0)` and expect zero items with total 0. Try `getSaleSummary(30, 2, getLineTotal)` and expect two items with total 60, with no discount message. Restore the driver to `getSaleSummary(30, 2)` afterward. The native grader additionally checks the supplied function's inputs, returned result and invocation count.

## Hints — use one at a time

1. Follow the third argument in the getSaleSummary function. What value does JavaScript finish evaluating before entering the getLineSummary function?

2. The calculatePrice parameter refers to a function. Compare passing that value with calling it and passing the returned number. Which does the receiving summary function expect?

## After your attempt

The complete runnable solution and explanation are in the separate `solution` folder. Use the course GitHub repository route from the “How to Download Source Code” article lecture in the Course Introduction section. Open the section folder, then this lecture's Practice folder. Keep all exercise work separate from the main lecture project.
