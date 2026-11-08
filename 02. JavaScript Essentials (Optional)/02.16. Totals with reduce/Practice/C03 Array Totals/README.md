# Array Totals — coding exercise

Array Totals

Build calculateBasketTotal(items). The starter currently returns zero for every basket. Return one numeric total by multiplying each entry's unitPrice by its count, then combining those line totals.

Use the reduce method with an appropriate initial accumulator, as taught in the lecture. The inputs are a dense array of ordinary records with finite, non-negative numeric unitPrice and count properties; count is a whole number. No input parsing or currency formatting is required.

Acceptance criteria
- Include every line's price multiplied by its count.
- Return the number 0 for an empty basket.
- Keep zero prices and zero counts meaningful.
- Support a single entry, different baskets and fractional prices.
- Leave the input array and its records unchanged.
- Repeated calls must calculate from the supplied items, independently.

For [{ unitPrice: 18, count: 4 }, { unitPrice: 12, count: 3 }], the result is 108. Keep the function name and parameter. Edit exercise.js and use Run tests to check behavior. The supplied HTML loads the file, and the provided evaluation calls your function; you do not write test infrastructure.

Before running, predict the accumulator after each entry. After your attempt, use the hints and complete explained solution to compare your reasoning.

Related lecture: Totals with reduce.
Allow about 8–15 minutes; this is an estimate, not a measured learner time.

## Local companion

This is an alternative to the native attempt, not a second required exercise. Copy this folder to `C:\react\lecture-16-practice`. Open `starter` in VS Code. Save `app.js` with Ctrl+S and run `node app.js` in its integrated Command Prompt terminal. Keep the main lecture project unchanged.

Expected output after your attempt:

```text
Basket total: 108
Empty total: 0
Original counts: 4, 3
```

## Hints

Hint 1
For one entry, identify which two properties determine its line total. Then consider what the callback should receive from the previous entry.

Hint 2
The returned callback value becomes the next accumulator. Choose an initial numeric value that also gives the intended answer when there are no entries.

## After your attempt

Compare with `solution/app.js` and `solution/README.md`. Use the course GitHub repository route from the “How to Download Source Code” article lecture in the Course Introduction section, then open this section and lecture folder.
