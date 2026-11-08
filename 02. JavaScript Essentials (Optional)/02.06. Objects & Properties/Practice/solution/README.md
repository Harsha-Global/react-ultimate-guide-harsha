# Complete solution — compare after your attempt

The bracket expression evaluates noteKey to the key shippingNote. Assigning product[noteKey] creates that property on the existing object. The new unitPrice property value is 28, and quantity is still 3, so the new call calculates 84. The separate initializer variable unitPrice remains 25; it does not track the property. Earlier logged results are already printed and do not change.

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
Practice: Ships tomorrow; total 84
```

Keep this practice separate from the main lecture source.
