# 12.04. Fetch Basics — thought checks

**What does each await return?**

await fetch(...) returns Response; await response.json() returns the parsed JavaScript value.

**Why can Fetch fulfill for a 404?**

Fetch received an HTTP response. Inspect ok/status to determine whether the operation succeeded.
