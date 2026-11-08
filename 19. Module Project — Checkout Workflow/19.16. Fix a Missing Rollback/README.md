# Fix a Missing Rollback

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer and Completed/product-explorer: the guided ShopFront project. It does not change in this lecture: the investigation and the repair happen in a separate practice copy, and the guided project continues unchanged.
- Live Bug/Missing Rollback/Faulty/product-explorer: the supplied faulty copy. A rejected price (13 for the Trail Backpack) shows the service's message, but the catalog preview keeps 13: onMutate cancels the detail query, captures the previous product and installs the proposed value, while onError only shows the error and never puts the previous product back.
- Live Bug/Missing Rollback/Fixed/product-explorer: the repaired copy. onError receives (error, _values, snapshot) and, when snapshot?.previous exists, puts it back into productKeys.detail(product.id) before showing the feedback; the form values are not reset.
- Live Bug/Missing Rollback/Investigation.md: the investigation notes.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Run only one copy at a time (both use the same addresses): stop the guided project's API and app first. Open the Faulty application folder in VS Code. In its terminal run `npm ci`, then `npm run api:reset` and `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. When you finish, stop both terminals, return to the guided project, run `npm run api:reset` there and start its service and app again.

## Try it

In the faulty copy, open Inventory, edit the Trail Backpack, change the price to 13 and save: the rejection appears, but the catalog preview still shows $13.00. After the repair in onError, the same save returns the preview to $79.00 while the price field keeps 13 with focus. Save 89, type 91 and choose Reset to saved details: the field returns to 89, and the inventory, bag and checkout show $89.00.
