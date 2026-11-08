# Save Inventory Changes

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the inventory editor checks a complete draft locally and saves nothing).
- Completed/product-explorer: src/ProductEditor.tsx now saves the checked draft. The submit handler is asynchronous: it clears the old feedback, awaits saveProduct with the product id and the checked values, then resets the form to the product the service returns (so later resets use the accepted values) and shows "Product changes saved." When the request fails, showError attaches the service's name and price messages to those fields (only those known field names), sets a form-level message from the error (or a fallback), and keeps the draft; an effect focuses the name, or otherwise the price, once the request has finished with a server error on it. While the request runs, the fieldset and both buttons are disabled, the save button reads "Saving changes…", and the unsaved-changes guard also covers the running request. Reset to saved details resets to the latest accepted values and clears the message.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

Open Inventory and edit the Trail Backpack. Set the price to 89 and choose Save changes: "Product changes saved." appears. Type 91 without saving and choose Reset to saved details: the price returns to 89, the latest accepted value. Save the name "Reserved product": the practice service rejects it, the form shows "That product name is reserved." with "Choose another product name." under the name, keeps the other values and focuses the name. Change the name back to Trail Backpack and save again. Run `npm run api:reset` afterwards to restore the sample catalog.
