# References & Equality — lecture-wise source code

Distinguish copied primitive values, references to one shared object, and separately created objects.

Continue `C:\react\javascript-essentials\app.js` in VS Code on Windows. Save with Ctrl+S and run `node app.js` in the integrated Command Prompt terminal.

## Expected output

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Summary: 3 items, total 75
Discounted summary: 3 items, total 67.5
Available: true
Updated: Travel Backpack x 3: 90
Available now: false
Product count: 3
First product: Travel Backpack
Last product: Water Bottle
Selected: Desk Lamp x 2: 30
Category: General
Featured: Travel Backpack; last: Water Bottle
Featured picks: 2 products
No selection: 0 products
Same primitive: true
Different types: false
Same object: true
Same fields, different object: false
Array entry shares object: true
Rest item shares object: true
Shared prices: 18, 18, 18
Separate object price: 15
Extracted price: 15
Earlier summary total: 30
Updated summary total: 36
```

## What the example teaches

- **Primitive comparison:** 15 === 15 is true; 15 === "15" is false. Strict equality performs no type conversion.

- **Alias:** selectedAlias and selectedProduct refer to the same object, so their comparison is true.

- **Separate object:** matchingProduct was created by a separate object literal. Matching fields do not make its identity equal.

- **Shared mutation:** After selectedAlias.unitPrice = 18, selectedProduct, products[1] and selection.items[1] all read 18.

- **Earlier values:** selectedPrice remains 15 and selectedSummary.total remains 30. Previously retrieved or calculated numbers do not update themselves.

- **Fresh calculation:** Reading the updated property and calling getLineSummary again produces 36 for two items.

For the ordinary numbers, strings and objects in this lecture, strict equality makes the shown value/identity distinction. It is not a deep comparison of object fields. JavaScript also has numeric edge cases such as NaN, outside this example. Reassigning a let variable to another object changes that variable’s reference without redirecting existing aliases.

Keep this main source for the “Spread Syntax” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
