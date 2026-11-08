# Validate Inventory Edits

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the shared product rules exist; the inventory editor still saves through a route action).
- Completed/product-explorer: src/types.ts adds a feature list to Product and narrows the category to Home, Travel and Audio. server/index.mjs, server/reset.mjs and server/seed.json are the supplied local service with feature-aware sample products. src/api.ts checks a product response with the shared productSchema, adds the image and features to the editable input, and gives ApiError a field-message record read from a checked error body (with the fallback message and an empty record when the body doesn't match). src/ProductEditor.tsx is now a React Hook Form editor: toProductForm turns the loaded product into form input (price and maximum quantity as text, each feature copied), the inner editor is keyed by the product id, useForm uses productFormSchema through the Zod resolver, the image preview follows the watched image path, and the submit handler shows the checked price as "Last checked draft. … Nothing has been saved." The name, price, description and maximum-quantity inputs show their own messages; Reset to saved details restores the loaded product; the unsaved-changes guard receives the form's dirty flag. The old edit action is removed from src/router.tsx and src/actions.ts (the delete action stays), and src/productForm.ts is deleted.
- Supplied Service: the three service files copied into the project's server folder.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api:reset` once to load the feature-aware sample products, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

## Try it

Open Inventory and edit the Trail Backpack. Clear the price and choose Check product details: the price shows "Enter a number." and nothing is checked. Enter 89 and check again: the form shows "Last checked draft. Price: $89.00. Nothing has been saved." Choose Reset to saved details: the original price (79) returns. Nothing is sent to the service in this lecture; the next lecture connects the save request.
