# Mapping with map — lecture-wise source code

Convert each product into one display object, using the callback return value to build a new array in source order.

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
Original city: Hyderabad
Updated city: Pune
Delivery fee kept: 40
Product name kept: Desk Lamp
Same product object: false
Same delivery object: false
Same tags array: true
Display count: 3
First display: 1. Travel Backpack, total 60
Second display: 2. Desk Lamp, total 36
Third display: 3. Water Bottle, total 24
Same array: false
Same first object: false
Original display label: undefined
```

## What the example teaches

- **Callback inputs:** item is the current product; index is its zero-based position. Parameter names are chosen by the author, while positions determine the supplied values.

- **Returned value:** The callback returns a new object with id, label and total. Parentheses make the object literal the arrow expression result.

- **Display numbering:** index + 1 creates labels numbered 1, 2 and 3 without changing zero-based array indexes.

- **Value flow:** Prices 30, 18 and 12, multiplied by quantity 2 through getLineTotal, produce totals 60, 36 and 24.

- **Preservation:** The result array is new. Our callback also creates new objects and does not add label to the source objects.

- **Missing return:** A block callback that evaluates item.name without returning it supplies undefined as that result item.

A new map result array does not make mutations inside its callback safe. Returning item can retain the same object reference; constructing an object creates a new one. Use map when its result array is useful. Empty arrays return empty arrays without calling the callback. These examples use dense arrays; they do not cover sparse-array holes or mutation during traversal.

Keep this main source for the “Filtering & Finding” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
