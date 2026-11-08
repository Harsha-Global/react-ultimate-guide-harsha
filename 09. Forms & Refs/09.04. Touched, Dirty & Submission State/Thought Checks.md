# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## Can a field be touched but not dirty?

Yes. Blur without editing, or edit then restore its baseline. Touched records interaction; dirty compares current and baseline values.

## Why derive current errors?

They depend only on the current draft. Storing and synchronizing another copy creates avoidable stale-state paths.

## What does attempted mean here?

The user tried submitting. It can reveal untouched invalid fields; it is not an asynchronous saving or success flag.
