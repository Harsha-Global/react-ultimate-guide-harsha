# Hints

1. Build one detail key from saved.id and use it for both cancellation and replacement.
2. Await cancelQueries before calling setQueryData, so the replacement follows cancellation.
3. Invalidate the list-family prefix afterward, and await that promise too. Do not substitute the detail prefix.
