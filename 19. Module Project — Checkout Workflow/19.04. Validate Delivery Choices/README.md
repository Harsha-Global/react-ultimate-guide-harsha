# Validate Delivery Choices

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the checkout form checks the contact details only).
- Completed/product-explorer: shared/checkoutSchema.ts adds the address (street, city and ZIP code strings with length limits), the delivery method enum (standard, express, pickup) and the optional delivery note, and a superRefine callback that requires the street, city and a five-digit ZIP code unless the method is pickup, reporting each issue at its own address path. src/CheckoutPage.tsx extends the form's starting values, watches the selected method with useWatch, re-checks the address fields when the method changes after the first submission (useEffect and trigger), and adds the delivery fieldset: the method select with its fees, a hint that follows the method, the address inputs with their messages, and the delivery note. src/index.css is the prepared stylesheet.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag and valid contact details, open checkout, leave the address empty and choose Check details: standard delivery reports the street, city and ZIP code. Choose Studio pickup: those messages clear and the contact details stay. Choose Standard delivery again: the messages return. Enter 145 Pine Street, Denver and 80202, then check again: the complete form passes. Nothing is sent to the service in this lecture.
