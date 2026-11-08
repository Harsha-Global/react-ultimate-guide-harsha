# Change request — Adjust the bag from checkout

The client now wants shoppers to increase, decrease and remove quantities directly from the checkout summary. The header, bag page and summary must reflect the same state immediately.

Use the existing product maximum and availability rules. Decreasing stops at one; removal is explicit. Increasing stops at the product maximum. An empty summary provides a route back to the collection. Preserve the bag after reload and retain the separate saved delivery preferences. During checkout submission, pause the quantity controls together with the form.

Acceptance example: one Trail Backpack at $79 becomes two, and the header count becomes 2 while the available subtotal becomes $158. The increase control is disabled at the maximum of 2. Returning to the bag shows the same quantity. A catalog category filter must not make the backpack unavailable to checkout.

Compare v2 with the original v1 from the preceding lecture. This change concerns the shared cart controls; it does not add the optional express-delivery phone and ZIP rules.
