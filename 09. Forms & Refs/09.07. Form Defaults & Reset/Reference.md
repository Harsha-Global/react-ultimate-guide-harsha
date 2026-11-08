# Form Defaults & Reset

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**What does Reset restore?**

A fresh copy of the active baseline, plus cleared touched/attempted/submitted/message metadata. It preserves independent ticket and cart state.

**Why does loading Emily update both baseline and draft?**

That action chooses a new editing origin. Dirty should compare against Emily’s defaults after loading.

**Why does changing a key reset fields?**

It replaces the component instance. Initial state and uncontrolled defaults are applied to the new instance. Edited fields in the existing instance remain their current edits.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Demonstration: Demonstrations/initial-defaults/movie-discovery (run it from its own folder). Practice: Practice/L01 (Task.md, Starter/movie-discovery and Solution/movie-discovery; work on a copy in its own folder). Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
- [preserving-and-resetting-state](https://react.dev/learn/preserving-and-resetting-state)
