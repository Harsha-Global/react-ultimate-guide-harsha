# Solution explanation

The single root cause was trusting an assertion at the saved-data boundary. The fix uses runtime checks to establish the expected shape and domain rules, then returns a typed object. Numeric strings are rejected, not silently converted. The price calculation stays unchanged and only receives validated requests.

Run `npm ci`, then `npm start` in this solution folder. Compare your reasoning and observed values, not only the final text.
