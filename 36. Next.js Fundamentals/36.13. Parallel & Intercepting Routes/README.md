# Parallel & Intercepting Routes

The completed application is the exact source demonstrated in the video.

- Starter/catalog-routes: the Catalog Routes app as completed in the previous lecture.
- Completed/catalog-routes: the app at the end of this lecture. Keep it for the next lecture.

A @modal parallel route slot in the learning layout and an intercepting route ((.)products/[slug]) that opens a product's details in an accessible dialog (components/ProductModal.tsx, built on radix-ui) when it is reached from the catalog, while a direct visit or a reload of the same address still shows the complete product page.

## Run

Copy the catalog-routes folder into your React workspace (for example C:\react\catalog-routes) and open it in VS Code. In a terminal run `npm ci` (the first installation needs registry access), then `npm run dev -- --port 5336` and open http://127.0.0.1:5336. To check a production run, stop the development server with Ctrl+C, then run `npm run build`, `npm run typecheck` and `npm run start -- --port 5336`. Do not run two servers on the same port or against the same .next folder.

## Try it

Open /catalog, search for desk with the lowest price first, apply the filters and select Studio Desk Lamp: the details open in a dialog over the retained list and the address becomes the product address. Tab stays inside the dialog; Escape returns to the filtered catalog. Reload the product address (or open /products/desk-lamp directly): the complete product page appears.
