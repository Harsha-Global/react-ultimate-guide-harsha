# Modules & Imports — separate practice

Copy the complete Practice folder to `C:\react\lecture-20-practice`. Open its `starter` folder in VS Code. Keep all four files together. Use the local server command from the Setup Guide, with its terminal working directory set to this starter folder. Stop any earlier server using the same port first.

## Make a local naming change

1. In app.js, use `sumBasket` as the local name of the default import.
2. Use `lineAmount` as the local alias for the named `getLineTotal` import.
3. Update their calls, keeping products.js and pricing.js exports unchanged. The first three output lines must remain the same.
4. Create practiceBasket by mapping basket into new item objects with count 1. Calculate its total with the imported sumBasket function.
5. Print the original basket’s first count, to check it was preserved.

Predict the new total before running. It should be 30 (18 + 12), and the original first count should remain 4. No new dependency is required.

## Hint

The default import’s local name is written without braces. The named import uses `getLineTotal as lineAmount`. Neither change requires editing the exported names. For the count update, return `{ ...item, count: 1 }` from map.

## After your attempt

Compare with the full four-file project in `solution` and its README. Serve that folder in the same way if you want to run it. Keep the main project unchanged. Use the course GitHub repository route from the “How to Download Source Code” article lecture in the Course Introduction section, then open this section and lecture folder.
