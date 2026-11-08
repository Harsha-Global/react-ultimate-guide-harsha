# State Design

**Which booking values need independent state?**

User choices and historical/process facts: quantity, showtime, guest, cart, selectedId and quoteState. The current price, total, cart total and selected item can be derived.

**Why keep the total inside a completed quote?**

It records a historical request. Deriving it from later choices would change the quote’s meaning. Current totals and historical totals serve different purposes.

**How does the union help?**

Only idle, preparing or ready-with-quote can describe the local process. Narrowing status to ready exposes a required quote. Independent flags/payloads permit contradictory combinations.

**Practice location**

Attempt Practice/C11/Local/Starter/movie-discovery; compare the complete Solution after testing increases, decreases and both bounds.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Practice: `Practice/C11` (`Task.md`, the `Local/Starter` and `Local/Solution` projects, and the explanation in `Solution.md`). Explained answers: `Thought Checks.md`.

## Further reading

- [Choosing The State Structure](https://react.dev/learn/choosing-the-state-structure)
