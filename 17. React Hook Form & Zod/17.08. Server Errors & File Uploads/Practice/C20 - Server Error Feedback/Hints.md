# Hints

1. Narrow unknown with instanceof ApiError before reading fieldErrors.
2. An email message needs its own setError call and shouldFocus: true.
3. Keep the existing form-level call outside the conditional so it runs for every failure.
