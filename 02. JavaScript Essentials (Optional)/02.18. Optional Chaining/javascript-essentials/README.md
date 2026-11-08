# Optional Chaining — lecture-wise source code

Read an optional nested property safely, placing each optional check at the level that can be null or undefined.

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
```

## What the example teaches

- **Known root:** item.delivery?.city checks delivery before reading city. A missing or null delivery returns undefined.

- **Optional root:** item?.delivery?.city also checks item before reading delivery.

- **Wrong level:** item?.delivery.city still throws if item exists but delivery is missing. The check on item does not protect a separate missing delivery.

- **Valid falsy values:** A present fee 0, note "", or express false remains that value. Optional chaining tests null and undefined, not all falsy values.

- **Result:** The safe read produces a value or undefined. It does not invent a default.

- **Scope:** Use optional chaining where absence is a normal possibility; keep required-data defects visible.

Optional chaining does not create missing objects, provide fallback values, or make every error disappear. It cannot protect an undeclared root identifier. Only null/undefined short-circuit. This lecture covers property access; optional method calls and grouping subtleties are outside its example.

Keep this main source for the “Nullish Defaults” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
