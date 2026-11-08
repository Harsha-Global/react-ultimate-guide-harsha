# Form Validation

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**Why explicitly reject a blank arrival field before Number?**

Number("") and whitespace become zero. The requirement accepts numeric zero but rejects an absent choice.

**Why branch on nextErrors instead of errors after setErrors?**

The current handler keeps its render snapshot. The freshly calculated local result is available immediately.

**Does browser validation replace the server?**

No. Native constraints help interaction, custom functions enforce local rules, and a real server must validate received data independently.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Demonstration: Demonstrations/browser-validation/movie-discovery (run it from its own folder). Practice: Practice/C16 (Task.md, Local/Starter and Local/Solution; work on it in its own folder). Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
- [Constraint_validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
