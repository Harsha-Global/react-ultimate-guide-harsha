# Check Contact Details

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the checkout page shows the adjustable summary beside a temporary review panel).
- Completed/product-explorer: shared/checkoutSchema.ts defines the contact rules with Zod (a trimmed full name of at least two characters, a trimmed lowercase email checked through pipe, and an optional phone number that is empty or ten digits) and exports the form's input and output types. src/CheckoutPage.tsx creates a separate form draft with React Hook Form (the Zod resolver, onTouched mode, the saved name and email as starting values), connects the full name, email and phone inputs with their labels, aria-invalid and aria-describedby, disables Check details while the bag can't be checked out, and shows the last checked email. src/index.css is the prepared stylesheet.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag, open Your bag and choose Review checkout. Clear the name and email, then choose Check details: each field shows its message. Enter Alex Morgan and alex@example.com, leave the phone empty and check again: the form reports the email that passed. A short phone number such as 123 shows the ten-digit message; clearing it passes again. Nothing is sent to the service in this lecture.
