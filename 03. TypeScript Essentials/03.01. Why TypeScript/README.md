# 03.01. Why TypeScript - source code

Everything demonstrated in this lecture.

## Folders

- `Demonstrations/wrong-value` - the ticket count reassigned to the string
  "2". `app.js` runs with Node and shows the unexpected result; `app.ts` is
  the same code with the TypeScript extension, where the editor reports the
  mismatch.
- `Demonstrations/correct-value` - the same example with the number 2.
- `Demonstrations/runtime-rule` - a type-correct count of -1, rejected by a
  runtime check.
- `Practice/starter` - your starting point for the practice change.
- `Practice/solution` - the complete solution. Try the starter first.

## Running the examples

From inside any of these folders, in a Command Prompt terminal:

```
node app.js
```

Node runs the `.js` files. The `.ts` files are for reading in VS Code, where
the editor shows the type error; this lecture does not compile them.

## What each one prints

| Folder | Output |
| --- | --- |
| Demonstrations/wrong-value | Tickets: 21 / Total: 252 |
| Demonstrations/correct-value | Tickets: 3 / Total: 36 |
| Demonstrations/runtime-rule | Choose at least one ticket |
| Practice/starter | Tickets: 3 / Total: 36 |
| Practice/solution | Tickets: 4 / Total: 48 |
