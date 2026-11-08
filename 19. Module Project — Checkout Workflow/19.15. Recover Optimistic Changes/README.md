# Recover Optimistic Changes

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the product save is tracked as a mutation; the side preview keeps the accepted record until the service confirms a change).
- Completed/product-explorer: src/ProductEditor.tsx adds an asynchronous onMutate callback: it builds the product's detail key, cancels any running query for that exact entry, reads the previous product from the cache as the rollback snapshot and, when one exists, puts a temporary record into the detail cache (the saved fields with the checked form values spread over them, and copied feature objects). It returns { previous }. onError receives (error, _values, snapshot), puts snapshot.previous back into the same detail entry when it exists, then shows the service's feedback; the form values are not reset. onSuccess no longer repeats the cancellation (onMutate cancels first) and is no longer asynchronous; onSettled still refreshes the lists. The submit handler's comment and the preview's pending message describe the immediate preview.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

In Inventory, edit the Trail Backpack. Save a price of 79, then enter 13 and save: the preview shows $13 at once with the pending message; after the practice service rejects it, the preview returns to $79.00 while the price field keeps 13 with the service's message. Save 89: the preview and the form agree. Run `npm run api:reset` afterwards to restore the sample catalog.
