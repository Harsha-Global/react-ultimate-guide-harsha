# Immutable Object Updates — lecture-wise source code

Change a nested delivery city while preserving the original product and copying only the affected object path.

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
```

## What the example teaches

- **Original record:** deliveryProduct has the selected product fields, delivery { city: "Hyderabad", fee: 40 }, and a tags array.

- **Outer copy:** The new outer object receives existing properties, then replaces delivery with its own new object.

- **Inner copy:** The inner spread preserves delivery.fee while city: "Pune" replaces the previous city.

- **Identity:** Both outer-product and delivery-object comparisons are false. The unchanged tags array can remain shared.

- **Preservation:** The original city stays Hyderabad, the new city is Pune, and both fees remain 40.

- **Rule:** Copy each object on the changed path. An immutable update is a construction pattern; it does not freeze the objects against later mutation.

A shallow outer copy still shares delivery. Replacing delivery with only { city } loses fee. Preserve untouched details while copying the changed path. Shared tags are safe for this operation because it does not mutate them; a later tags change needs its own copy.

Keep this main source for the “Mapping with map” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
