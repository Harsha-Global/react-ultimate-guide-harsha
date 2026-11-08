# Save Products with Mutations

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the editor saves directly in its submit handler, then updates the cached detail and refreshes the lists).
- Completed/product-explorer: server/index.mjs is the supplied service update (a practice rejection: the Trail Backpack at a price of 13 is refused with 409 and a price message). src/ProductEditor.tsx imports useMutation and useIsMutating, defines a write key (["product-write", product.id]), counts this product's active writes with useIsMutating({ mutationKey: writeKey, exact: true }) and tracks the save with useMutation (retry: false; mutationFn calls saveProduct(product.id, values)). onError passes the failure to showError and keeps the rejected values in the form; onSuccess cancels an earlier request for the exact detail entry, sets the returned product, resets the form, clears the file selection and shows the saved message; onSettled returns the list invalidation. The busy flag also covers an active write; the submit handler returns early while a write is active, clears the previous feedback and awaits mutation.mutateAsync(values). The side preview reads the product prop (image, name, formatted price) and shows a waiting message while a write is active; the save button's label follows the same condition.
- Supplied Service/server/index.mjs: the service update copied in the video.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

In Inventory, edit the Trail Backpack. Save a price of 79, then enter 13 and save: while the request runs the preview keeps $79.00 and the save controls are unavailable; after the rejection the preview still shows $79.00 and the price field keeps 13 with the service's message. Save 89: the preview and the form agree. Type 91 without saving and choose Reset to saved details: the field returns to 89. Run `npm run api:reset` afterwards to restore the sample catalog.
