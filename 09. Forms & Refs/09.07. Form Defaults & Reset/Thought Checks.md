# Thought checks with explained answers

These are discussion checks, not extra assigned coding activities. Try each question before reading its answer.

## What does Reset restore?

A fresh copy of the active baseline, plus cleared touched/attempted/submitted/message metadata. It preserves independent ticket and cart state.

## Why does loading Emily update both baseline and draft?

That action chooses a new editing origin. Dirty should compare against Emily’s defaults after loading.

## Why does changing a key reset fields?

It replaces the component instance. Initial state and uncontrolled defaults are applied to the new instance. Edited fields in the existing instance remain their current edits.
