# Solution explanation

The early return handles the missing selection. TypeScript then narrows category to the two literal strings. The student branch adjusts the price; the standard branch keeps it. undefined is a deliberate missing result, while 0 remains a valid numeric result.

Run `npm ci`, then `npm start` in this solution folder. Compare your reasoning and observed values, not only the final text.
