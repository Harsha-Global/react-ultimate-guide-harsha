# Complete solution — compare after your attempt

The first assignment reads true and stores that Boolean in availabilityBefore. Mutating selectedAlias.inStock changes the one shared Desk Lamp object. Reads through selectedProduct, products[1] and selection.items[1] all see false. The separate matchingProduct object retains its own true property. The saved Boolean also stays true. This is a property mutation; the const alias variable itself is not reassigned.

The complete `app.js` contains all required declarations. Run `node app.js` from this solution folder.

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
Same primitive: true
Different types: false
Same object: true
Same fields, different object: false
Array entry shares object: true
Rest item shares object: true
Shared prices: 18, 18, 18
Separate object price: 15
Extracted price: 15
Earlier summary total: 30
Updated summary total: 36
Saved availability: true
Shared availability: false, false, false
Separate availability: true
```

Keep this practice separate from the main lecture source.
