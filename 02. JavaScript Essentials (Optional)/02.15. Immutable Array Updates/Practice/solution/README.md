# Complete solution — compare after your attempt

changeCount returns a new array and new bottle object while preserving the earlier bottle count of 3. The new count is 5. Filtering that returned array removes p3 and leaves the existing p2 object with count 4. The final array has length 1 and identifier p2. No earlier array or shared object is assigned to.

The complete `app.js` contains all required declarations. Run `node app.js` from this solution folder.

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
Bottle quantities: 3, 5
Lamp only: 1, p2
```

Keep this practice separate from the main lecture source.
