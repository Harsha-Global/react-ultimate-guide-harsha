# State Debugging Practice

**Mutation acceptance**

From a fresh run: original receipt stays 1; current early-show quantity increments once and caps at 6; late-show quantity stays 2. The faulty updater can show extra changes in development StrictMode.

**Total acceptance**

One ticket = $12; two = $24; six = $72; decrease works; bounds stay 1–6.

**Identity acceptance**

A typed note survives a compact toggle. Another showtime clears it. Returning to a removed showtime instance does not restore discarded text.

**Continuation source**

Use this lecture’s main movie-discovery, which matches the previous main app. The three practice solutions are independent investigations and do not replace it.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Practice: `Practice` (start with `Practice/README.md`; each investigation folder has its `Task.md`, with the explanation, and separate `Starter` and `Solution` projects). Explained answers: `Thought Checks.md`.

## Further reading

- [Updating Arrays In State](https://react.dev/learn/updating-arrays-in-state)
- [Choosing The State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Preserving And Resetting State](https://react.dev/learn/preserving-and-resetting-state)
