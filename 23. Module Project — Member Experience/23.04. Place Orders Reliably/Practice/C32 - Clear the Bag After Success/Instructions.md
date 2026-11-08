# Clear the Bag After Success

Complete submitOrder. Call placeOrder once and wait for its saved result. Only after that succeeds, call showConfirmation with the returned order, then call clearBag. If placeOrder rejects, call showError with its Error message and leave the bag alone. For a non-Error failure, show "We could not confirm the order.".

The supplied UI callbacks do not throw. Do not retry automatically, invent a saved order, clear the bag early, or treat a promise as a confirmation. The separate lecture project handles authentication, server validation and duplicate-request protection.

Attempt the task before opening the solution. The local Starter and Solution are inside 23. Module Project — Member Experience/Place Orders Reliably/Practice/C32 - Clear the Bag After Success. Use the course source-code route described in How to Download Source Code. The local companion includes strict TypeScript checking. The hosted result does not establish strict null safety.
