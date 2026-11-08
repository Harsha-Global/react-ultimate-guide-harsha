# CR-43-01 — filter the fulfillment queue (v2)

Requested after the initial merchant workspace. A merchant needs to focus on all orders, awaiting payment, ready to fulfill or dispatched. Keep inventory visible while filtering the queue.

Acceptance: store the selected status in the URL; restore it on reload and browser history; provide Apply filter and Clear; normalize missing, unknown and repeated values to all; apply the filter in the database before the recent20 limit; retain every membership and item-scope predicate. Match the fulfillment's workspace as well as its status. An empty result gets a useful message, not an error. Confirm both desktop and mobile controls.

The v2 native board shows target ready/dispatched states. Ordinary fixtures are still pending at the "Filter the Fulfillment Queue" lecture; verified fulfillment is connected in the "Connect Verified Fulfillment" lecture. A valid status parameter never authorizes an unrelated workspace. This change does not include merchant order notes.
