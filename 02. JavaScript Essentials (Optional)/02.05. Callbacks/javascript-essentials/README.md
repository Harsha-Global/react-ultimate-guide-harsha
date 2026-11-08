# Callbacks — lecture-wise source code

Continue `C:\react\javascript-essentials\app.js` in VS Code on Windows. Save with Ctrl+S and run `node app.js` in the existing integrated Command Prompt terminal.

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Summary: 3 items, total 75
Discounted summary: 3 items, total 67.5
```

## What changed

The `getLineSummary` function now receives a `calculatePrice` parameter whose default is the `getLineTotal` function. It calls the supplied function with its `price` and `count` parameters, and puts the returned number in the object's `total` property. The existing regular summary explicitly supplies `getLineTotal`.

The new `getDiscountedTotal` function calls `getLineTotal` and multiplies the result by 0.9. A second summary caller supplies this function, producing the same object structure with a discounted total. The callback runs synchronously inside the summary call.

Pass a function value when the receiver expects a function. Writing a call instead evaluates it immediately and passes its result. The default function value does not have call parentheses.

Numeric input is assumed. The existing count default is 1 for omitted or undefined counts; zero stays zero. These small arithmetic examples do not introduce currency formatting or input validation.

Keep this correct main checkpoint for the “Objects & Properties” lecture. Trace logs, the immediate-call comparison, the inline-arrow comparison and the exercise helper stay in their separate folders.

## Source access

Use the course GitHub repository route provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP in a browser or clone it with Git. Open the section folder, then this lecture's folder. Keep the downloaded lecture-wise source code separate from the main working project. No new dependency or scaffold is required.
