# Separate callback demonstrations

Copy these contents to `C:\react\callbacks-demos`. Keep the integrated Command Prompt terminal working directory at `C:\react\javascript-essentials`, and run each comparison by its absolute path.

## Trace

Run `node C:\react\callbacks-demos\trace\app.js`.

```text
Before summary
Summary started
Discount calculated
Summary completed
After summary: 67.5
```

The two functions use block bodies to log their execution. The summary stores the callback result in a local `total` variable before returning its object.

## Immediate call — intentionally broken

Run `node C:\react\callbacks-demos\immediate-call\app.js`.

```text
Before summary
Discount calculated
Summary started
TypeError: calculatePrice is not a function
```

The nested `getDiscountedTotal(25, 3)` call runs while preparing the outer call's arguments. Its returned number becomes the summary function's `calculatePrice` parameter. A number is not callable. Stack trace paths/line numbers vary.

Repair the recording copy by changing only the third argument to `getDiscountedTotal`. Save and rerun that same file; its output must match the trace above. The supplied download preserves the broken example for reproduction.

## Inline arrow

Run `node C:\react\callbacks-demos\inline-arrow\app.js`. The five correct main messages are followed by `Inline summary: 3 items, total 67.5`. The inline arrow is created as the third argument and called by the receiving summary function. It duplicates the short pricing expression only for comparison; the main source keeps the named pricing rule.

## Return to main

Open `C:\react\javascript-essentials\app.js` again, then run `node app.js`. Verify the five main messages, ending with `Discounted summary: 3 items, total 67.5`. The main source is not changed by these separate files. Keep the Callback Timing exercise separate too.
