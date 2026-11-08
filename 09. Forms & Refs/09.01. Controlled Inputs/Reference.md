# Controlled Inputs

Use the course GitHub repository linked from the “How to Download Source Code” article lecture. Download its ZIP or clone it, then find the section and lecture folder.

**Why keep a numeric field as a string while editing?**

An empty edit is meaningful. Preserve it until validation/conversion; Number("") would turn it into zero.

**Which property represents a checkbox selection?**

checked is the Boolean selection; value is the submitted token. Text inputs use value.

**Does defaultValue keep an edited field synchronized?**

It establishes the initial value. A controlled value follows React state; an uncontrolled field keeps its current edit in the browser.

## Files

Main: movie-discovery. Prepared CSS: Styles/booking.css. Windows setup: Setup.md. Demonstration: Demonstrations/input-ownership/movie-discovery (run it from its own folder). Explained answers: Thought Checks.md.

## Official references

- [useState](https://react.dev/reference/react/useState)
- [input](https://react.dev/reference/react-dom/components/input)
