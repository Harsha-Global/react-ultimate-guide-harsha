# Complete solution — compare after your attempt

combinedCopy receives the same four object references in a new array. featuredOffer receives copied properties in a new object, with 24 written last for unitPrice; featuredProduct stays at 30. Array spread does not clone the object in slot zero, so the final identity comparison is true.

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
Copy count: 4
Featured prices: 30, 24
Copy shares first item: true
```

Keep this practice separate from the main lecture source.
