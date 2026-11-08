# Respect Cart Limits

Repair addToCart in exercise.ts. Allow about 10 minutes.

The starter keeps increasing a product even when its maximum allowed quantity has been reached. Product limits vary: do not use one fixed maximum for the whole cart.

If product.inStock is false or product.maxQuantity is below 1, return the same cart contents. For an existing line already at or above that product's maximum, also leave the contents unchanged. Otherwise, add a missing product with quantity 1, or increase only its existing line by one.

Preserve row order and the exact objects of unrelated rows. For an increase, return a new array and a new changed row. Never mutate the input array, rows or product. No-op cases may return the original array or a shallow copy; both are accepted. Do not insert duplicate rows or remove a product at its limit.

The supplied cart and product values have already passed their basic data validation. Keep the types and function signature. This is the product-specific add operation from the Share Cart State lecture, rather than another fixed-range reducer task.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 19. Module Project — Checkout Workflow/Share Cart State/Practice/C23 - Respect Cart Limits. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
