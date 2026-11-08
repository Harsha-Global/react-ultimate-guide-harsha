# Changes in this lecture

- `src/loaders.ts`: preserve loader data for a returned validation or failure result; otherwise use the router's normal revalidation decision.
- `src/router.tsx`: connect the existing save action and revalidation policy to the existing edit and inventory routes.
- `src/Inventory.tsx`: show confirmation from the saved query parameter.
- `src/ProductEditor.tsx`: connect Form POST, typed action data, field messages, accessible attributes, pending controls, and summary-first focus.

Form POST reaches the browser route action. Its existing helper sends a separate PATCH request to the API. Test an empty name, malformed price and an unavailable product with a positive quantity limit. Then restore valid values, save a new price, reload and inspect the product and bag. Reset the sample data after checking persistence.
