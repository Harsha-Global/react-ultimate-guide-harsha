# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## Why explicitly reject a blank arrival field before Number?

Number("") and whitespace become zero. The requirement accepts numeric zero but rejects an absent choice.

## Why branch on nextErrors instead of errors after setErrors?

The current handler keeps its render snapshot. The freshly calculated local result is available immediately.

## Does browser validation replace the server?

No. Native constraints help interaction, custom functions enforce local rules, and a real server must validate received data independently.
