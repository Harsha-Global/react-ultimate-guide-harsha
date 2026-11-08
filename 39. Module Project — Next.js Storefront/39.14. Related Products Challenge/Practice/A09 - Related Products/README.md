Windows working copy: copy this complete practice or support resource to a new folder under C:\react, with no & anywhere in its full path. Preserve all supplied relative folders and keep each runnable project separate. Stop the previous app/API before starting another on the same ports. Before a production build, stop the current Next server and keep only that copy's API running.

Extend the supplied independent ShopFront starter with a related-products page at /products/[slug]/related. The guided main must stay unchanged. Use the existing validated, cached public reader; do not create a second product source or store server catalog data in browser persistence.

Implement selectRelatedProducts(products,currentId). Return up to two other available products. Prefer products in the current product's category, preserving their fixture order, then fill unused positions with available products from other categories in fixture order. Exclude the current ID, zero-stock products and duplicate IDs. Return an empty array for a missing current product or no eligible alternatives. Do not mutate the input or product objects.

Build the new route from one catalog snapshot. Preserve missing-product and API-failure behavior, show an explicit empty result, reuse ProductGrid and its shortlist controls, and add an Explore related products link on the full product page. Give the new page a matching title and canonical path through generateMetadata. Preserve public writes disabled in hosted mode.

Use the four-product fixture for the actual browser and the supplied synthetic same-category cases for priority tests. Verify direct loading, the product-page link, selection/reload, missing products, no available alternatives and API failure/retry. Restore fixture values after each check. Do not deploy this optional solution over the guided release.

Allow 50 minutes. Submit the selector, route and metadata changes; test output; and a brief browser verification record with exact inputs and observed results. Compare the complete solution only after attempting the task.

10 points: 4 for selector rules and immutable behavior; 3 for route, data, metadata, missing and empty integration; 2 for actual browser and automated evidence; 1 for clear recovery and fixture restoration.


Open Starter/shopfront-next for the attempt and Solution/shopfront-next for comparison. Run npm ci; start npm run api in one terminal and npm run dev in another. Use http://127.0.0.1:3000. The original selector starter fails its intended related-product tests. After implementing the feature, run npm test, npm run typecheck and npm run build with the API healthy. For repeatable empty and outage checks that cannot be hidden by a warm cache, follow Recording Support/README.txt in the isolated Uncached Recovery Check. Restore the fixture and stop both processes afterward.
