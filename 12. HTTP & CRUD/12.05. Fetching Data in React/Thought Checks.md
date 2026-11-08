# 12.05. Fetching Data in React — thought checks

**Does a successful status prove Employee[]?**

No. Parse the body and validate its runtime shape before returning it.

**Does the ignore flag cancel a request?**

No. It prevents obsolete results from updating state. Cancellation is introduced later.
