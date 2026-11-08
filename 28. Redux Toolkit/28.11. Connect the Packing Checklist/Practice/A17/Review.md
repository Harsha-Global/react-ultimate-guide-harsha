# A17 written solution review

Read `src/features/checklist/checklistSlice.ts` first. completedCleared derives completed IDs from state.ids and state.entities, then passes those IDs to removeMany. The adapter removes only those tasks and updates both structures. An empty ID list leaves the current state unchanged. It does not reset the selection slice.

selectCompletedCount uses the adapter's existing selectTasks result and counts done tasks. The component selects that number, disables the button for zero, and dispatches completedCleared when clicked. It never copies the tasks into local state. The existing empty message needs no new condition.

The tests cover a mixed list, an unchanged no-completed list, removal of all completed tasks, prior snapshot preservation, unchanged selection identity and the actual button/empty-state connection. Replace removeMany(state, completedIds) with removeAll(state) only in an isolated test copy to verify the mixed-list test fails, then restore it.

The full solution is `Solution/order-desk`. Nothing here updates saved server orders or adds persistence; a browser reload still restores the supplied starting checklist.
