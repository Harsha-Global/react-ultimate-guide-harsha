# Thought checks and explained answers

Try the question before opening the answer. These are discussion checks, not additional assigned coding exercises.

## Why did the first message say one while the screen showed two?

The running handler captured quantity=1. Its setter queued 2, but did not rewrite that render’s binding.

## How does the corrected handler use two immediately?

It calculates nextQuantity, passes it to the setter, and uses that same local value in the message.

## Does await setQuantity(...) expose committed state?

No. A state setter does not return a promise for the commit. The current handler still belongs to its render.

## Why can the action message differ after another control is clicked?

The message records a completed adjustment action. A current-quantity label should instead derive from the current quantity.
