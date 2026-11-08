# Q06 — Answer key and explanations

## 1. Correct answer: A

- **A:** Correct. The shared reducer gives coordinated transitions and one source for the rendered quantities. Persistence may be added separately.
- **B:** Independent copies can disagree within the same browser. Writing storage does not automatically synchronize those React state values.
- **C:** Query identity describes server data requests, not an arbitrary render or this client-owned cart.
- **D:** The cart is shared application state. A form DOM read would couple the header to one screen and miss its own updates.

Revisit: Reducers & Context

## 2. Correct answer: B

- **A:** A type annotation does not inspect values received at runtime.
- **B:** Correct. The schema checks the actual value. The helper must reject or otherwise handle the failed parse; TypeScript then follows the checked result.
- **C:** The key identifies a cached result. It does not validate the response body.
- **D:** Freshness policy changes cache reuse, not response validation.

Revisit: Zod Schemas & Type Inference; Server State & Query Setup (the checked helper)

## 3. Correct answer: C

- **A:** The results differ even though the endpoint path is shared. One key would mix their cache identity.
- **B:** The page changes which records the server returns, so it belongs in the identity too.
- **C:** Correct. The key and query function must agree on the complete request inputs. Equivalent normalized values should identify the same result.
- **D:** Random keys prevent meaningful reuse and can grow the cache with unrelated entries.

Revisit: Query Keys

## 4. Correct answer: A

- **A:** Correct. The detail can use the checked full response. List invalidation lets the server recalculate membership, ordering and totals for matching queries.
- **B:** Changing a label does not repair search membership, pagination or totals.
- **C:** The detail and lists have separate keys. Invalidating the detail does not automatically invalidate those list entries.
- **D:** A document reload discards useful state and avoids the intended cache update rather than implementing it.

Revisit: Invalidation & Cache Updates

## 5. Correct answer: B

- **A:** The user would see a state the server did not accept, with no explanation.
- **B:** Correct. The snapshot preserves the earlier accepted display; immutable prediction keeps that snapshot usable for restoration.
- **C:** Unbounded retries do not make a rejected business rule valid and prolong an incorrect display.
- **D:** Mutating the snapshot destroys the earlier value needed for recovery.

Revisit: Optimistic Updates (and its recovery practice)

## 6. Correct answer: D

- **A:** A duplicate state owner can become stale after cache updates and adds unnecessary synchronization.
- **B:** A new client would fragment or repeatedly reset the cache and lose shared reuse.
- **C:** Submitting the same write twice creates duplicate side effects and unclear error/refresh ownership.
- **D:** Correct. The loader prepares the cached record, the query observer subscribes, and the mutation keeps responsibility for that feature's writes and cache updates.

Revisit: Query & Router Integration

