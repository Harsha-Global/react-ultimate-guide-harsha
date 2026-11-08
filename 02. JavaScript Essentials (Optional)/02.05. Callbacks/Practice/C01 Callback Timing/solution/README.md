# Complete solution — compare after your attempt

Only the last helper changes:

```js
const getSaleSummary = (price, count = 1, calculatePrice = getDiscountedTotal) =>
  getLineSummary(price, count, calculatePrice);
```

The mistake is in the third argument forwarded by the getSaleSummary function. The starter calls calculatePrice(price, count) while preparing the arguments for getLineSummary. That produces a number before the summary function starts. The number becomes its calculatePrice parameter, so attempting to call it produces TypeError: calculatePrice is not a function.

Forward the function value by writing calculatePrice without the inner call parentheses or arguments. Keep the outer getLineSummary call. Its expression body returns the resulting summary object automatically.

For getSaleSummary(30, 2), the summary function now logs Summary started, calls the discount function once with 30 and 2, receives 54, logs Summary completed, and returns { count: 2, total: 54 }. The local driver then prints Sale summary: 2 items, total 54.

The default pricing function and count are unchanged. getSaleSummary(30) produces { count: 1, total: 27 }. getSaleSummary(30, 0) produces { count: 0, total: 0 }. Supplying getLineTotal as the third argument produces the regular total of 60 for 30 and 2. Hard-coding 54 or always choosing the discount function would fail these other cases.

The callback is synchronous: its calculation finishes inside the summary call. Passing a function does not by itself schedule a delay or background work.

The complete runnable `app.js` file includes the familiar functions and a local driver. Run `node app.js` from this solution folder. No hidden dependency or unfinished code remains.
