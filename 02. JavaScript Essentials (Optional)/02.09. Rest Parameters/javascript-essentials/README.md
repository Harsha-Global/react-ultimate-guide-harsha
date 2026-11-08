# Rest Parameters — lecture-wise source code

Give a function one fixed label and a varying number of product arguments, collected into an array.

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
```

## What the example teaches

- **Fixed parameter:** label receives the first argument.

- **Rest parameter:** ...items collects all arguments after label into a new array.

- **Two product arguments:** The collected items array has length 2 and its first product is at index 0.

- **No product arguments:** The rest array is empty and the count is 0.

- **An array argument:** Passing products as one argument makes one entry whose value is that whole array; rest does not flatten it.

- **Syntax boundary:** One rest parameter is permitted, at the end, with no default initializer or trailing comma.

Rest collects argument values after the fixed parameters. An array passed as one argument stays one collected value. New rest arrays can contain references to existing objects; collecting an object does not clone it. A function intended to accept one existing list may simply use an ordinary array parameter.

Keep this main source for the “References & Equality” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
