# Thought checks and explained answers

Try the question before opening the answer. These are discussion checks, not additional assigned coding exercises.

## Why does the quote show Emily after the current form says David?

The handler constructed a request-time object of primitive fields, and the callback retained that object. This is the explicit quote requirement.

## Why does the faulty delayed increase produce two after choosing four?

It closes over quantity=1 and later requests 1 + 1. The fixed updater calculates from the pending state, so 4 becomes 5.

## Does an updater refresh every captured value?

No. Its argument supplies the pending value for that particular state update. Other captured values are still from their closures.

## What limits this local demo?

One request is pending at a time; the timer simulates a wait and is not a server reservation. Wait for it before leaving the demo. Unmount cancellation, real network races and service failures are outside this lesson.
