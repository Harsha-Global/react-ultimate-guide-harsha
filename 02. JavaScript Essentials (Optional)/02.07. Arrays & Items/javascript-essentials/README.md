# Arrays & Items — lecture-wise source code

Keep several product objects in order, select an item by position, and then read its properties.

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
```

## What the example teaches

- **Array literal:** [product, secondObject, thirdObject] creates the ordered list.

- **Index:** The three populated positions are 0, 1 and 2. An index is not the product id property.

- **Length:** This filled three-item array has length 3; its final index is 2.

- **First and last:** products[0] reads the first item; products[products.length - 1] reads the last item when the list is not empty.

- **Selection:** products[1] supplies the Desk Lamp object. Its unitPrice of 15 and count 2 produce total 30.

- **Boundary:** products[3] is undefined here. Reading .name from that value throws a TypeError.

The length explanation concerns our ordinary filled array. JavaScript can also have empty slots; length is not generally a count of present elements. An empty array has no first or last item to read. This lecture observes a missing-item error without introducing later guard/optional-chaining syntax. The separate replacement demonstration mutates one existing position and keeps length 3.

Keep this main source for the “Destructuring” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
