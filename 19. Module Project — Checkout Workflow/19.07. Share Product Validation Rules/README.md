# Share Product Validation Rules

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (checkout recovers from a rejected email and protects unsaved changes).
- Completed/product-explorer: shared/productSchema.ts defines the product rules once: a shared fields object (name, category, description, availability, an image path under /assets or an uploaded path, and up to five feature rows, each with text), a numeric price from 0.01 to 10,000 with at most two decimal places, a whole-number quantity from 0 to 99, and checkStock, which rejects an available product with a maximum quantity below one or an unavailable product with any other quantity than zero. productSchema applies those rules to numeric values; productFormSchema receives price and maximum quantity as text, trims it, rejects an empty value and converts it to a number before the same rules run. ProductFormInput and ProductFormValues are its input and output types. examples/product-rules.ts is the supplied example that runs four sample drafts through productFormSchema. The existing inventory editor is unchanged in this lecture.
- Examples: the supplied example file (product-rules.ts) with its README.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

In a terminal in the project folder, run `node examples/product-rules.ts` (Node 24 runs the TypeScript example directly). The first sample is accepted and shows the price 79 as a number and a maximum quantity of 2; an empty price fails with "Enter a number."; an unavailable product that still allows two fails on maxQuantity ("Use 1 to 99 when available, or 0 when unavailable."); the unavailable product with zero is accepted.
