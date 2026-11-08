# Checkout Review & Challenge

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer and Completed/product-explorer: the guided ShopFront checkout project. It does not change in this lecture: the video reviews the completed workflow and runs `npm run lint` and `npm run build` on it. Keep this checkpoint with its client designs and prepared styles for the next part of the course.
- Practice/Delivery Validation: the optional delivery-validation challenge. Read Assignment.md first, work in Starter/product-explorer (its own project copy, separate from the guided project), and compare with Solution/product-explorer and Review.md only after your attempt. Hints.md has short hints.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`. Run only one copy at a time: the guided project and the challenge copies use the same addresses.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag, open checkout and increase its quantity: the header shows 2, the item subtotal $158.00, and the increase control becomes unavailable at the maximum of 2. Fill the contact and address fields with sample details, choose Standard delivery and prepare the checkout: the draft shows $158.00 for the items and $5.00 for delivery, and a reload keeps the bag. Use blocked@example.com to see the service's rejection without losing the other values, then correct it and try again. Edit the delivery note and leave the page: Keep editing keeps the note; Discard changes and leave leaves. In the inventory editor, a price of 13 is rejected and the preview returns to $79.00 while the field keeps 13.
