# Sorting Arrays — lecture-wise source code

Arrange products by numeric price in a new array, while keeping the source order and item identities available.

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
```

## What the example teaches

- **Default order:** Without a comparator, sort compares string representations. [2, 10, 1] becomes [1, 10, 2].

- **Numeric comparator:** left.unitPrice - right.unitPrice returns a negative, positive or zero result.

- **Sign:** Negative puts left before right; positive puts left after right; zero treats them as equal for this ordering.

- **Mutation:** sort reorders its receiving array and returns that same array. Spread first when preserving the earlier array matters.

- **Shallow copy:** [...products] copies item references; the sorted bottle still references products[2].

- **Equal keys:** Equal-price items retain their prior relative order. Do not rely on a particular comparator call sequence.

A comparator returns a number, not a Boolean. It should describe a consistent order without changing its inputs. Exact comparator call order is an implementation detail. Copying the array preserves its order but does not clone its objects. Modern sort is stable for equal keys; the demonstration uses ordinary dense arrays.

Keep this main source for the “Optional Chaining” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
