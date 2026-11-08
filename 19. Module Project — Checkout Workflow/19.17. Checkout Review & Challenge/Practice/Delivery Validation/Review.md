# Delivery Validation: reference solution

The solution adds two express-only checks in `shared/checkoutSchema.ts`. An empty phone receives a nested field issue; the existing phone rule rejects nonempty values that are not ten digits. A syntactically valid five-digit ZIP outside 802 receives the service-area message. Malformed ZIP values retain the existing five-digit error, avoiding two competing format messages.

The API uses the same nested schema through `checkoutRequestSchema`, so invalid direct requests return 422. Its general rejection message is retained; the browser shows more specific client field messages during ordinary use. The existing blocked-email 409 is unchanged.

`CheckoutPage.tsx` includes `contact.phone` in the dependent-field trigger after the first submit attempt. Standard and pickup remove express-only errors; express adds them if the current values fail. Before a submit attempt, normal on-touch validation still applies. The phone label/helper and delivery helper reflect the selected method. The input retains its accessible error association, and the existing form handling controls invalid focus, pending state, retained rejected drafts and successful reset.

This is an assignment solution, separate from the main lecture checkpoint. The main checkpoint and starter intentionally retain the original express behavior. The delivery-area requirement is a fictional client rule, not a general postal or shipping rule. Use the manual rubric in Assignment.md and report actual results.
