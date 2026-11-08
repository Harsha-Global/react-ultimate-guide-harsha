# Delete Products & Refresh Inventory — references

**Goal:** Confirm one row deletion and refresh confirmed data while preserving useful failure feedback.

## Teaching sequence

- Remove a product deliberately
- Let the action and loader coordinate the result
- Add the delete request and route action
- Build a confirmation for the selected row
- Verify cancel, success and stale saved choices

## Official API references

- [useFetcher](https://reactrouter.com/api/hooks/useFetcher)
- [Actions](https://reactrouter.com/start/data/actions)

## Checkpoint outcome

Deletion uses confirmation, a row fetcher and failure-aware list revalidation.

Use Code.md for the exact changed source. The full supplied service contract is in `API Contract.md`. Client route actions run in the browser and use existing backend endpoints. A request abort does not undo a server write. Keep browser shopper choices separate from current API records and local editor drafts.
