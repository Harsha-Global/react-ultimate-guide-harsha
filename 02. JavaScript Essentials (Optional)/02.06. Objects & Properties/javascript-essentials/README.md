# Objects & Properties — lecture-wise source code

Keep related product details in one object and read the property needed by each calculation.

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
```

## What the example teaches

- **Object:** One product record, with named properties whose values can have different types.

- **Dot access:** product.unitPrice reads the property literally named unitPrice.

- **Bracket access:** product[stockKey] evaluates stockKey and uses its value, inStock, as the property key.

- **Shorthand:** name is equivalent to name: name when creating this object.

- **Computed key:** [stockKey]: true creates an inStock property because stockKey holds that string.

- **Mutation:** product.unitPrice = 30 changes a property of the existing object. const prevents reassignment of product.

These examples use ordinary object literals with known string keys. A missing property read yields undefined here. Reading with product.stockKey uses the literal key stockKey, so it does not read inStock. const protects the variable binding, not the object contents.

Keep this main source for the “Arrays & Items” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
