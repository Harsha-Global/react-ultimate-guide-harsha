# Availability Filter Solution

Practice/Availability Filter/Solution/product-explorer is the exact assignment solution demonstrated in this video. Starter is the independent starting copy. Completed/product-explorer is the unchanged main course checkpoint and remains the main course continuation.

## Run a copy

Use the existing Node.js 22.22 or later requirement. In the chosen product-explorer folder, run npm ci. Start npm run api in one terminal and npm run dev in another, then open http://127.0.0.1:5185. Stop the previous copy using ports 4185 and 5185 first.

The source contains local assets, fonts and licenses. Generated dependencies, build output and API runtime data are excluded. npm run api:reset restores six seed products and normal timing; saved browser bag and delivery values remain separate.

## What changed

catalogView.ts adds availability to the normalized view, accepts only in-stock or out-of-stock, and serializes the choice when nonempty. Existing loaders, pagination and detail return links inherit it.

Catalog.tsx adds the three-choice Availability select to the existing GET form and displays the applied label beside the result count. Its defaultValue comes from the loader view. The keyed form restores earlier applied choices during Back navigation.

index.css uses the prepared responsive grid for the extra control, keeping the existing visual design.

## Verify

- In stock: four products on two pages. Open page two, visit its product, and return; the choice and page stay in the address.
- Unavailable: Travel Mug and Reading Cushion. Combining it with Home leaves Reading Cushion.
- Searching for lamp while Unavailable is applied shows the correct empty result.
- Reload, a copied link in another tab, and Back restore the applied controls and matching result.
- An unsupported availability value falls back to All products; Reset clears applied choices.
- Check the control at a narrow width. Run npm run check, npm run lint and npm run build.

Use the How to Download Source Code article in the course to reach the course source repository.
