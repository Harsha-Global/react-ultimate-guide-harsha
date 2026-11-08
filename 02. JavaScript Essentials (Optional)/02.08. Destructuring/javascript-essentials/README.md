# Destructuring — lecture-wise source code

Read chosen properties or array positions into clearly named variables, using defaults when a retrieved value is undefined.

Continue `C:\react\javascript-essentials\app.js` in VS Code on Windows. Save with Ctrl+S and run `node app.js` in the integrated Command Prompt terminal.

## Expected output

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
```

## What the example teaches

- **Object pattern:** { name: selectedName } reads the name property and creates selectedName; it does not rename the source property.

- **Array pattern:** [featuredProduct, selectedProduct, lastProduct] reads indexes 0, 1 and 2 in order.

- **Default:** category = "General" supplies the binding value when the property read is undefined.

- **Present values:** Defaults preserve 0, false, an empty string and null.

- **Skip:** [, middleProduct] skips index 0 and binds the object at index 1.

- **Source remains:** A default supplies a variable value; it does not add a missing property to the original object.

Object patterns select by key; array patterns select by position. Defaults apply to undefined, including a missing entry/property, and do not validate arbitrary source shapes. The selected product variables still hold the existing objects; reference sharing is examined in the References & Equality lecture.

Keep this main source for the “Rest Parameters” lecture. Demonstrations and Practice are separate; their edits do not belong in this working file.

## Source access

Use the course GitHub repository route supplied through the “How to Download Source Code” article lecture in the Course Introduction section. Download the ZIP through a browser or clone using Git. Open the section folder, then this lecture’s folder. No new dependency or scaffold is required.
