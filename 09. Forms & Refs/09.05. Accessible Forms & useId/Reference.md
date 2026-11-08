# Accessible Forms & useId

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**What does aria-describedby contain?**

Space-separated IDs of existing descriptive elements, including help and an error only when that error exists.

**Why use useId for two forms?**

Each instance needs distinct relationships. Do not rely on its exact generated string or use it to generate list keys.

**Do these checks establish screen-reader speech?**

No. DOM relationships and keyboard interaction were checked. Actual screen-reader announcements can only be confirmed by testing with a screen reader, and different browsers and screen readers may announce the feedback differently.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Demonstration: Demonstrations/two-form-instances/movie-discovery (run it from its own folder). Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
- [useId](https://react.dev/reference/react/useId)
