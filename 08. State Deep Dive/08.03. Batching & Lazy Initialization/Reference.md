# Batching & Lazy Initialization

**Starting at 1, what do replace 5 then increment produce?**

Six. The updater receives the value produced by the preceding queue entry. A later replacement with 2 produces 2.

**What is the difference between useState(createStarterCart()) and useState(createStarterCart)?**

The first calls the factory while evaluating an argument on each render. React ignores a later initial argument, but JavaScript already did that work. Passing the function lets React call it during initialization.

**Does lazy mean exactly once forever?**

No. A new component instance initializes again. StrictMode may call a pure initializer more than once in development to detect impurities.

**Does the sample cart persist across reloads?**

No. It is local sample data, and a full reload creates a fresh instance. It is not storage or a network request.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Demonstrations: `Demonstrations/update-queue`, `Demonstrations/eager-initializer` and `Demonstrations/lazy-initializer`, each a complete `movie-discovery` project. Explained answers: `Thought Checks.md`.

## Further reading

- [Queueing A Series Of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Usestate](https://react.dev/reference/react/useState)
