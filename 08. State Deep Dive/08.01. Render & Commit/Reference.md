# Render & Commit

**Does every component call replace the whole page?**

No. Rendering calculates a description; committing applies the needed DOM changes. Development checks can call render logic again without representing a second user interaction.

**Which work belongs in render?**

Calculating the current total and creating new local values are appropriate. Mutating an existing cart, sending a request or writing storage because the component ran makes rendering impure.

**Trace one ticket click.**

The child invokes its callback; the parent queues a quantity update; React renders using the new state; the summary receives new props; the needed DOM changes are committed.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Demonstration: `Demonstrations/render-trace/movie-discovery`. Explained answers: `Thought Checks.md`.

## Further reading

- [Render And Commit](https://react.dev/learn/render-and-commit)
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [Usestate](https://react.dev/reference/react/useState)
