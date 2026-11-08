# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## Does assigning ref.current request a render?

No. A ref persists across renders but is not reactive display state.

## Why can a node ref be null?

Before React attaches the committed node and after detachment there is no current DOM node. Use a nullable type and an existence check.

## Why is focus safe in this submit handler?

The invalid fields already exist in the committed DOM. Newly conditional fields need a different timing plan; changing their controlled values through the DOM would conflict with state.
