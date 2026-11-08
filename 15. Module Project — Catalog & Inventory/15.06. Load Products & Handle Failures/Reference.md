# Load Products & Handle Failures — references

**Goal:** Load one product by id and distinguish waiting, missing records and retryable failures.

## Teaching sequence

- Load the product identified by the address
- Follow a loader from address to page
- Load a product by its address
- Make waiting and recovery visible

## Official API references

- [Error boundaries](https://reactrouter.com/how-to/error-boundary)
- [useRevalidator](https://reactrouter.com/api/hooks/useRevalidator)

## Checkpoint outcome

Product detail also loads from the API. Local filter controls are still the earlier version.

The full supplied service contract is in `API Contract.md`. Client route actions run in the browser and use existing backend endpoints. A request abort does not undo a server write. Keep browser shopper choices separate from current API records and local editor drafts.
