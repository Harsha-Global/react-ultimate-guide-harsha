# C17 — Derived Selectors

Implement selectSelectionSummary for the supplied workflow state. The orders collection contains unique IDs. selectedIds may contain repeated or missing IDs. Return selectedCount for known selected records, readyCount for those records whose status is ready, and canPrioritize. Eligibility is true only when at least one distinct ID is selected, every requested ID exists, and every selected record is ready. Pending or shipped records are not ready. Count a repeated selected ID once. Do not mutate either input array or its records, and do not store computed results in the input state.

For OD-1041 ready plus OD-1042 payment-pending, expect selectedCount 2, readyCount 1 and canPrioritize false. For OD-1041 plus a missing ID, expect 1, 1 and false. An empty selection is false.

Keep the supplied TypeScript types and function name. This exercise tests the calculation only; the lecture app demonstrates the actual Redux/React connection. Attempt before opening the solution. Local strict TypeScript companions are in this lecture's Practice/C17 - Derived Selectors folder. Use the course source-code route explained in How to Download Source Code. Native behavior results do not establish all strict compiler settings.

## Hints

- Filter the complete record list by the selected IDs, not by readiness first.
- Compare the known selected count with the number of distinct requested IDs.
- Check the empty case explicitly before approving all-ready records.
