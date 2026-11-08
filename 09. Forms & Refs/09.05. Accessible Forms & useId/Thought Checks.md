# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## What does aria-describedby contain?

Space-separated IDs of existing descriptive elements, including help and an error only when that error exists.

## Why use useId for two forms?

Each instance needs distinct relationships. Do not rely on its exact generated string or use it to generate list keys.

## Do these checks establish screen-reader speech?

No. DOM relationships and keyboard interaction were checked. Actual screen-reader announcements can only be confirmed by testing with a screen reader, and different browsers and screen readers may announce the feedback differently.
