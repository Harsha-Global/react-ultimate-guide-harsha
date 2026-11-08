# Immutable Array Updates — lecture-wise source code

Add, update and remove basket entries while preserving earlier arrays and copying the object that actually changes.

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
```

## What the example teaches

- **Add:** Spread basket into a new array and append a new p3 object: 2 entries become 3.

- **Update:** changeCount maps over the supplied array. A matching id receives { ...item, count }; an unmatched item is returned unchanged.

- **Remove:** filter keeps entries whose id !== "p1". The result contains p2 and p3 in their earlier order.

- **Version flow:** basket → addedBasket → updatedBasket → removedBasket. Removing from updatedBasket retains the lamp count of 4.

- **Identity:** Updating creates a new array and new lamp object. The untouched backpack and bottle objects can remain shared.

- **Boundaries:** An unknown id changes no item; map still returns a new array. Zero is stored as a count, not silently interpreted as removal.

Copying only an array still shares its item objects, so copied[0].count = 4 can mutate the earlier version. The matching object needs its own copy. The example uses unique ids. The update function does not add missing ids, remove zero counts or validate business inputs; those would be separate explicit application rules.

Keep this main source for the “Totals with reduce” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
