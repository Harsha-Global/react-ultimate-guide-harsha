# State Snapshots

**Why did the first message say one while the screen showed two?**

The running handler captured quantity=1. Its setter queued 2, but did not rewrite that render’s binding.

**How does the corrected handler use two immediately?**

It calculates nextQuantity, passes it to the setter, and uses that same local value in the message.

**Does await setQuantity(...) expose committed state?**

No. A state setter does not return a promise for the commit. The current handler still belongs to its render.

**Why can the action message differ after another control is clicked?**

The message records a completed adjustment action. A current-quantity label should instead derive from the current quantity.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Demonstration: `Demonstrations/snapshot-mismatch/movie-discovery`. Explained answers: `Thought Checks.md`.

## Further reading

- [State As A Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Usestate](https://react.dev/reference/react/useState)
