# Select Eligible Orders

Client request: selecting ready orders on the visible page must add them to the existing selection. The current function loses selections from other pages and can return duplicate IDs. Repair selectEligibleOrders using only its selectedIds and rows arguments.

Return a new array containing the previously selected IDs in their original order, followed by each missing ready row ID in response order. The incoming selectedIds are unique. Ignore payment-pending and shipped rows, but do not remove an ID that was already selected. Add a repeated ready row only once. Do not mutate either input, even when the response is empty. Keep the supplied types and function name.

Example: selectedIds is ["OD-1041"] and the current rows contain ready OD-1043 and shipped OD-1044. Return ["OD-1041", "OD-1043"]. This helper chooses client-side selection; the service must still validate a later fulfillment request.

Attempt the exercise before opening the complete solution. The strict local Starter and Solution are in this lecture's Practice/C35 - Select Eligible Orders folder through the source-code route explained in the How to Download Source Code article lecture. In each separate folder run npm ci, then npm test.
