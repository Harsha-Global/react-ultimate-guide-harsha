# Complete solution — compare after your attempt

The two-product call collects Backpack at index 0, so its first property holds that object and .name reads Travel Backpack. The label-only call creates an empty rest array. Reading items[0] yields undefined, which becomes its first property value. Reading emptySelection.first is valid; adding .name would cause the missing-item error. Keep the label/items/count properties and both original calls.

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
First selected: Travel Backpack
undefined
```

Keep this practice separate from the main lecture source.
