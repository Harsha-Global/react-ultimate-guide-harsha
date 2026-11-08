# Closures & Stale State

**Why does the quote show Emily after the current form says David?**

The handler constructed a request-time object of primitive fields, and the callback retained that object. This is the explicit quote requirement.

**Why does the faulty delayed increase produce two after choosing four?**

It closes over quantity=1 and later requests 1 + 1. The fixed updater calculates from the pending state, so 4 becomes 5.

**Does an updater refresh every captured value?**

No. Its argument supplies the pending value for that particular state update. Other captured values are still from their closures.

**What limits this local demo?**

One request is pending at a time; the timer simulates a wait and is not a server reservation. Wait for it before leaving the demo. Unmount cancellation, real network races and service failures are outside this lesson.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Demonstrations: `Demonstrations/quote-observation`, `Demonstrations/delayed-stale` and `Demonstrations/delayed-fixed`, each a complete `movie-discovery` project. Explained answers: `Thought Checks.md`.

For the timed quote comparison, use `Demonstrations/quote-observation/movie-discovery`. It uses the same request-time capture with an eight-second delay, so you can change the inputs before the result appears. The main project retains its two-second delay. See [the observation steps](Demonstrations/quote-observation/README.md).

## Further reading

- [State As A Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
