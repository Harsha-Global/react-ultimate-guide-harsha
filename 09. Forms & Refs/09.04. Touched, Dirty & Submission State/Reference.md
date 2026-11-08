# Touched, Dirty & Submission State

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**Can a field be touched but not dirty?**

Yes. Blur without editing, or edit then restore its baseline. Touched records interaction; dirty compares current and baseline values.

**Why derive current errors?**

They depend only on the current draft. Storing and synchronizing another copy creates avoidable stale-state paths.

**What does attempted mean here?**

The user tried submitting. It can reveal untouched invalid fields; it is not an asynchronous saving or success flag.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
