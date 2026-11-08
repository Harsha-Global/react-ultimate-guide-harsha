# Optional hints — read progressively

1. Compare the displayed record before clicking, while pending, and after the rejected response. Did the server ever accept the published flag?
2. Trace which cache entry the detail badge reads, and which mutation callbacks run before and after the request.
3. Check whether the previously saved value is used when the request fails. Invalidating list keys does not directly replace the separate detail entry.
