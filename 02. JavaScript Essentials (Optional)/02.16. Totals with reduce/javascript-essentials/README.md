# Totals with reduce — lecture-wise source code

Combine several line amounts into one basket total by returning the next accumulator, with an explicit numeric starting value.

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
```

## What the example teaches

- **Inputs:** reduce receives a callback and initial value 0. The callback receives the previous total and current entry.

- **Contribution:** getLineTotal(item.unitPrice, item.count) calculates the current entry’s amount.

- **Callback return:** total + lineTotal becomes the accumulator for the next entry. Logging is not a substitute for returning.

- **Trace:** Remaining entries: 0 + 72 = 72, then 72 + 36 = 108. The final returned accumulator is 108.

- **Empty input:** With initial 0, an empty array makes no callback calls and returns 0. Without an initial value it throws TypeError.

- **Choose the result shape:** map builds corresponding entries; filter selects matching entries; reduce carries one combined result. That result need not always be numeric.

An initial value is optional in the API, but needed for this empty-safe numeric calculation over item objects. Without it, the first entry becomes the accumulator and the callback starts at the next entry. A callback can still mutate input if it assigns into an item. These examples use dense arrays, finite non-negative numeric prices and whole-number counts; money rounding and input validation are separate concerns.

Keep this main source for the “Sorting Arrays” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
