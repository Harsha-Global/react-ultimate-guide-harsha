# Spread Syntax — lecture-wise source code

Build new objects and arrays from existing values, and distinguish a new outer structure from shared object references.

Continue `C:\react\javascript-essentials\app.js` in VS Code on Windows. Save with Ctrl+S and run `node app.js` in the integrated Command Prompt terminal.

## Expected output

```text
Original price: 18
Copy price: 20
Same object: false
Counts: 3, 4
Last combined item: Packing Cube
Same array: false
Same second object: true
All products: 3 products
```

## What the example teaches

- **Object spread:** { ...selectedProduct, unitPrice: 20 } creates a new product object. The original price stays 18.

- **Overwrite order:** A property written later replaces an earlier value for the same name. Putting the spread after the override restores the source price.

- **Array spread:** [...products, ...extraProducts] contains four items in source order. The two input arrays still have lengths 3 and 1.

- **Shallow copy:** productListCopy is a new array, but productListCopy[1] and products[1] reference the same object.

- **Call spread:** getSelectionSummary("All products", ...products) passes three product arguments. Its rest parameter collects them into a new array.

- **Context:** Object literals copy properties; array literals and calls expand iterable items. A plain product object cannot be spread into array positions.

These examples use ordinary records and dense arrays. Spread is shallow. A later mutation of an object shared by two arrays is visible through both paths. Object spread does not make a universal deep clone; array/call spread requires an iterable value. The main file preserves its prices; deliberate mutations are in separate demonstrations.

Keep this main source for the “Immutable Object Updates” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
