# React UI Check

Choose one answer per question. This is a review aid, not a progress gate.

## 1. A child needs to request a shared quantity change. What should it do?

A. Assign to the received quantity prop.
B. Call the callback supplied by the state-owning parent.
C. Create unrelated local state with the same initial number.

## 2. Which key fits a filtered product collection with stable ids?

A. The visible array index.
B. A fresh random number during every render.
C. The stable product id.

## 3. Which onClick prop runs a handler after activation?

A. onClick={handleSave}
B. onClick={handleSave()}
C. onClick="handleSave"

## 4. Quantity is1. Two queued setQuantity(quantity+1) calls request what final value?

A. 2
B. 3
C. It must alternate between2 and3.

## 5. The total is quantity multiplied by a selected price. Where should the total normally come from?

A. Separate total state updated in every handler.
B. A calculation from the current quantity and price.
C. A mutation of the received quantity prop.

## 6. You need to prevent a handled form submission from navigating. Which method addresses that default action?

A. stopPropagation()
B. preventDefault()
C. Both methods always do the same thing.
