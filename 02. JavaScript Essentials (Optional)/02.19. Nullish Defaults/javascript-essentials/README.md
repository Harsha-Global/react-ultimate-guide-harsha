# Nullish Defaults — lecture-wise source code

Apply defaults only when values are null or undefined, preserving valid zero, empty-string and false choices.

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
Available count: 1
Available product: Desk Lamp
Same available object: true
Affordable count: 2
First affordable: Desk Lamp
No matches: 0
undefined
No matching product
Basket counts: 2, 3, 3, 2
Lamp quantities: 1, 4
New updated array: false
Changed item shared: false
Unchanged item shared: true
Remaining IDs: p2, p3
Remaining totals: 72, 36
Original basket total: 78
Added basket total: 114
Updated basket total: 168
Remaining basket total: 108
Empty basket total: 0
Original first: Travel Backpack
Sorted first: Water Bottle, 12
Sorted middle: Desk Lamp, 18
Sorted last: Travel Backpack, 30
Same sorted array: false
Same bottle object: true
Present city: Hyderabad
undefined
undefined
undefined
Delivery fee: 0
Delivery note: []
Express: false
Quantity with OR: 1
Quantity with nullish: 0
Label with OR: [Untitled]
Label with nullish: []
Details with OR: true
Details with nullish: false
Missing quantity: 1
Cleared quantity: 1
Known delivery fee: 0
Missing delivery fee: 40
```

## What the example teaches

- **Logical OR:** value || fallback chooses fallback for any falsy value, including 0, "" and false.

- **Nullish coalescing:** value ?? fallback chooses fallback only for null or undefined.

- **Preservation:** savedQuantity 0 stays 0; savedLabel "" stays empty; savedShowDetails false stays false.

- **Missing values:** Both missingQuantity undefined and clearedQuantity null select the default 1.

- **Nested access:** item.delivery?.fee ?? 40 first reads safely, then chooses a fallback if the read is nullish. A fee of 0 remains 0.

- **Grouping:** Mixing ?? directly with || or && is a syntax error. Parenthesize the intended grouping; different groupings can produce different answers.

Choose the operator from the meaning of absence in the application. ?? does not validate data types or replace every unsuitable value. Default parameters apply to undefined, while ?? also handles null. Parentheses are required when mixing ?? with || or &&; they select the grouping, not a universal desired outcome.

Keep this main source for the “Modules & Imports” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
