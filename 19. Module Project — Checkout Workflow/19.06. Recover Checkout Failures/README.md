# Recover Checkout Failures

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (checkout sends the checked details to the local service and shows the prepared draft or a form-level alert).
- Completed/product-explorer: src/CheckoutPage.tsx imports CheckoutError, and a rejected request that names a field (the email) also sets that field's own server error and focuses it; the alert, the typed values and the address stay in place. An effect focuses the email input once the request has finished with that server error. The page passes the form's isDirty and isSubmitting flags to the new src/UnsavedChanges.tsx, which uses React Router's useBlocker to stop a move to another page while the form has unsaved changes or a request is running: it shows Leave without saving? with Keep editing and Discard changes and leave (Please wait for the save. while a request runs), and useBeforeUnload asks the browser to confirm a reload or a closed tab in the same situations.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

With one Trail Backpack in the bag, open checkout and complete the standard-delivery details (145 Pine Street, Denver, 80202). Use blocked@example.com and choose Prepare checkout: the alert and the email's own message appear, the address stays, and the email input receives focus. Change the email to alex@example.com and prepare again: the last prepared draft shows a $79.00 subtotal and a $5.00 delivery fee. Then change the delivery note and choose Collection: Keep editing keeps the note in the form, and Discard changes and leave opens the Collection page. No order is placed and no payment is taken.
