# Complete solution — compare after your attempt

item => item?.delivery?.city guards both nullable levels. A known delivery returns its city; a missing delivery or null root short-circuits to undefined. The helper reads data without changing it.

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
Hyderabad
undefined
undefined
```

Keep this practice separate from the main lecture source.
