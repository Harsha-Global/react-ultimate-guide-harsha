# Thought checks and explained answers

Try the question before opening the answer. These are discussion checks, not additional assigned coding exercises.

## Which booking values need independent state?

User choices and historical/process facts: quantity, showtime, guest, cart, selectedId and quoteState. The current price, total, cart total and selected item can be derived.

## Why keep the total inside a completed quote?

It records a historical request. Deriving it from later choices would change the quote’s meaning. Current totals and historical totals serve different purposes.

## How does the union help?

Only idle, preparing or ready-with-quote can describe the local process. Narrowing status to ready exposes a required quote. Independent flags/payloads permit contradictory combinations.

## Practice location

Attempt Practice/C11/Local/Starter/movie-discovery; compare the complete Solution after testing increases, decreases and both bounds.
