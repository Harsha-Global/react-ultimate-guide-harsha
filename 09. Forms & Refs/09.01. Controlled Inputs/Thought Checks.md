# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## Why keep a numeric field as a string while editing?

An empty edit is meaningful. Preserve it until validation/conversion; Number("") would turn it into zero.

## Which property represents a checkbox selection?

checked is the Boolean selection; value is the submitted token. Text inputs use value.

## Does defaultValue keep an edited field synchronized?

It establishes the initial value. A controlled value follows React state; an uncontrolled field keeps its current edit in the browser.
