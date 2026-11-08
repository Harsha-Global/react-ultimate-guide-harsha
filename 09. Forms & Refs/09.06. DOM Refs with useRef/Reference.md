# DOM Refs with useRef

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**Does assigning ref.current request a render?**

No. A ref persists across renders but is not reactive display state.

**Why can a node ref be null?**

Before React attaches the committed node and after detachment there is no current DOM node. Use a nullable type and an existence check.

**Why is focus safe in this submit handler?**

The invalid fields already exist in the committed DOM. Newly conditional fields need a different timing plan; changing their controlled values through the DOM would conflict with state.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Demonstration: Demonstrations/ref-state-local/movie-discovery (run it from its own folder). Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
- [useRef](https://react.dev/reference/react/useRef)
