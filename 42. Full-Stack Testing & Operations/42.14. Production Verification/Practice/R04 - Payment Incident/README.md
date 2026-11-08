Payment Incident — 10-minute technical role play

A customer reports receiving two order notifications and worries that they were charged twice. Morgan asks whether support should issue a refund immediately. The only initial evidence is the repeated notification; the payment provider state, application order, webhook event IDs, outbox delivery and receipt record have not yet been compared. Discuss a safe technical investigation using the taught workflow. Use synthetic identifiers and do not request card details, passwords or session cookies.

Morgan, Support lead: The customer received two order notifications and is worried about being charged twice. Should we refund one now, or is there something we should check first?

Your goal: Separate an observed duplicate notification from an unverified duplicate charge, gather relevant evidence and agree on a controlled investigation and recovery plan.

Observable goals
1. Ask for the order, checkout/session, event and job identifiers plus timestamps, without requesting card details or credentials.
2. Compare verified provider payment state with the saved order, processed events, outbox delivery and the receipt’s unique order ID; explain what each observation proves.
3. Propose a controlled recovery that preserves evidence, uses the existing idempotent operation and avoids creating a new charge or blindly replaying unrelated work.
4. Communicate what is known, what remains uncertain, who owns the next checks and when support will receive an update.

Written alternative
1. Write the first questions you would ask Morgan and explain which sensitive data you do not need.
Sample response: Ask for the order ID, provider Checkout Session/payment reference, relevant event/job IDs and the two delivery timestamps. Request only synthetic or appropriately authorized operational evidence. Card numbers, passwords, session cookies and an unrestricted request-body dump are unnecessary. Two messages establish repeated communication, not a second payment.

2. Suppose the provider shows one paid Checkout Session, the application has one paid order and one receipt, but two notification deliveries. What can you conclude, and which records would you inspect next?
Sample response: The supplied records support one recorded payment and one receipt for this order. They do not prove why two messages were delivered or rule out an unrelated second order. Compare the provider references and amount/currency, duplicate or distinct webhook IDs, processed-event timestamps, outbox ID/attempts/acknowledgement and notification-provider delivery IDs. Check whether a retry occurred after an acknowledgement was lost or whether another path sent the same notification.

3. Propose a safe investigation and recovery sequence, including how you would communicate with support before the cause is confirmed.
Sample response: Retain the identifiers and timestamps, assign an owner to compare provider and application records, and stop any uncontrolled manual retry loop. Reconcile through the taught verified-state path and reuse stable identities; do not start a fresh Checkout or change paid state merely to trigger another message. If a notification must be retried, use its documented idempotent delivery mechanism and verify the result. Explain the currently observed duplicate notification, the payment evidence still being checked and the next update time. A financial correction requires confirmed records and the organization’s authorized process.

This is a fictional course incident. The AI role play provides practice, not verification of a real payment or a guarantee of instructor feedback. Use the written alternative when the native conversation is unavailable.
