# Complete solution — compare after your attempt

The inStock property exists and holds true, so available receives true. The missing shippingNote property reads as undefined, triggering its default for the new binding. The source object still lacks that property; its direct read therefore prints undefined. Renaming the variable does not rename the object property. No deep copy or live link for a retrieved primitive is created.

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
Available: true; note: Collection available
undefined
```

Keep this practice separate from the main lecture source.
