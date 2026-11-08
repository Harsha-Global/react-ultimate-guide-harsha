# Edit Product Features

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the inventory editor saves its main fields and resets to the latest accepted product).
- Completed/product-explorer: src/ProductEditor.tsx manages the product's feature rows with useFieldArray on the existing features path: each row is keyed by its generated field id, registers features.<index>.text, shows its own message (with an id based on the field id, linked from the input's aria-describedby), and has a Remove button named "Remove feature <n>". Add feature appends an empty row and is disabled while saving or at five rows. Both are ordinary buttons (type="button"), so they don't submit the form; the existing save request sends the feature array with the other fields. src/ProductPage.tsx lists the saved features below the description, and its <title> is one template-literal string so the browser tab shows "<product> | ShopFront".
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

Open Inventory and edit the Trail Backpack. Choose Add feature twice, enter "Water-resistant fabric" and "Two inside pockets", then remove the first new row: the remaining row still reads "Two inside pockets". Add an empty row and save: the row asks you to enter a feature or remove it. Remove the empty row and save. Change the feature text without saving and choose Reset to saved details: the saved text returns. Open the backpack's product page: the saved features appear below the description and the tab reads "Trail Backpack | ShopFront". Back in the editor, add rows up to five: Add feature is disabled. Run `npm run api:reset` afterwards to restore the sample catalog.
