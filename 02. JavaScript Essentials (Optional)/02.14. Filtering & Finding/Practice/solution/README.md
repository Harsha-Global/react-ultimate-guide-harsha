# Complete solution — compare after your attempt

Prices 30 and 18 satisfy >= 18, so premiumProducts contains two existing objects. The id comparison finds p3, the Water Bottle object. find returns that original object reference, so equality with products[2] is true. The supplied identifier is known to exist; keep the explicit missing-result guard for general searches.

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
Premium count: 2
Chosen: Water Bottle
Shared bottle: true
```

Keep this practice separate from the main lecture source.
