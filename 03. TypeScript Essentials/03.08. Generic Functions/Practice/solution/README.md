# Solution explanation

T connects the input array’s element type to the returned item. Each call infers its own T. The implementation reads the first element and leaves the array unchanged. An empty array has no first element, so undefined is part of the return contract. The function does not convert items or validate an external shape.

Run `npm ci`, then `npm start` in this solution folder. Compare your reasoning and observed values, not only the final text.
