# Progressive hints

1. The phone field already validates any supplied number. The new requirement is whether an empty value is allowed for the chosen method.
2. Use the existing object-level `superRefine` callback. Report paths `contact.phone` and `address.postal`; keep ordinary five-digit validation separate from the 802 service-area rule.
3. The supplied API already validates `checkoutRequestSchema`, which includes the shared checkout schema. Avoid maintaining another list of express rules in the endpoint.
4. The form watches `method`. Its existing post-submission effect triggers address validation; include the phone field so changing the method refreshes both dependent errors.
5. Update the label and helper with the watched method. Keep their IDs and the error association stable. Do not clear the whole form just to remove an outdated error.
