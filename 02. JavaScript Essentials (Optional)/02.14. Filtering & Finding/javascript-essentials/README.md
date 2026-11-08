# Filtering & Finding — lecture-wise source code

Choose between an array of every match and the first matching item, and handle a missing search result before reading properties.

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
```

## What the example teaches

- **filter:** products.filter(item => item.inStock) creates a one-item array containing the existing desk lamp object.

- **find:** products.find(item => item.unitPrice < 20) returns the desk lamp object directly and stops at that first match.

- **Condition:** The predicate receives the current item. Our comparisons and inStock property produce Boolean values.

- **Order:** Filtering below 20 retains p2 then p3. Finding below 20 returns p2, although p3 is cheaper; first follows array order.

- **No match:** filter returns []; find returns undefined. Their result shapes remain different.

- **Guard:** Check result === undefined first. The if branch handles absence; else can read the found object’s name.

Selected objects remain shared with the source. Neither method clones item objects. find means first matching item in current order, not cheapest or best. Reading name from undefined throws TypeError; a missing match itself is a normal search outcome. Empty input yields [] for filter and undefined for find.

Keep this main source for the “Immutable Array Updates” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
