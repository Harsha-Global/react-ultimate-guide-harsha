# Thought checks and explained answers

Try the question before opening the answer. These are discussion checks, not additional assigned coding exercises.

## Does every component call replace the whole page?

No. Rendering calculates a description; committing applies the needed DOM changes. Development checks can call render logic again without representing a second user interaction.

## Which work belongs in render?

Calculating the current total and creating new local values are appropriate. Mutating an existing cart, sending a request or writing storage because the component ran makes rendering impure.

## Trace one ticket click.

The child invokes its callback; the parent queues a quantity update; React renders using the new state; the summary receives new props; the needed DOM changes are committed.
