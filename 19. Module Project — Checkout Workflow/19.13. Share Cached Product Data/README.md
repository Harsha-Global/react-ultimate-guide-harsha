# Share Cached Product Data

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the catalog reads its filtered results from the query cache; the other screens still use their loaders' data).
- Completed/product-explorer: src/productQueries.ts adds an all-products key (["products", "list", "all"]) and a detail key (["products", "detail", id]) with allProductsOptions() and productOptions(id). src/loaders.ts: allProductsLoader awaits queryClient.query(allProductsOptions()) and returns null; productLoader keeps its missing-id check, awaits the detail query and returns { id }; the catalog loader is unchanged. src/ProductPage.tsx reads the id from its loader, subscribes to productOptions(id), shows QueryFeedback until the product exists and above the page while it refreshes. src/ProductEditor.tsx: the outer route component subscribes to the detail query, shows the feedback outside the form and renders the inner editor keyed by the id, so a refreshed product never resets an unfinished draft. src/Inventory.tsx, src/CartPage.tsx and src/CheckoutPage.tsx read the complete collection from allProductsOptions() (an empty array until it arrives), with the same feedback; their unused loader imports are removed. After an accepted save the editor cancels any earlier request for that product's detail, sets the detail to the returned product and keeps the list invalidation; after an accepted delete, the action removes that product's detail entry before invalidating the lists.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

Choose Home and Apply filters, then open the bag: the Trail Backpack (Travel) is still there, and checkout shows the same product and quantity. In Inventory, edit the Trail Backpack, set the price to 89 and save: its details page, the inventory and the bag all show $89.00. Back in the editor, type 91 without saving: a background refresh of the product doesn't replace your unsaved value. Run `npm run api:reset` afterwards to restore the sample catalog.
