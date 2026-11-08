# L02 — Solution explanation

The starter schedules a new callback for every `value` or `delayMs` change but never cancels the previous one. An older callback can therefore set the debounced value after newer input is visible. Keep the timeout ID from `setTimeout` and return `() => window.clearTimeout(timeoutId)` from the Effect. React runs that cleanup before replacement setup and on unmount. The controlled query input stays immediate; only the derived list waits for the latest scheduled update.

Verify quick replacement, clearing, no matches and unmounting. The task list and selection remain otherwise unchanged.
