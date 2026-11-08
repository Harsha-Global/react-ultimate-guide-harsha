# Order Desk — operations client brief

Use the completed guided main project from the Query Testing & Selection lecture. Keep its corrected live-cache merge, session boundaries and existing tests. This milestone connects those learned pieces into an operations workflow; it does not rebuild Redux from an empty app.

## Existing foundation

Search, server pages, detail/status edits, the independent live view, selected IDs, packing preview, local checklist and density persistence already work. The service owns the versioned orders. The Redux client slices own selected IDs, preparation tasks and preferences. Search drafts and open detail IDs stay local to the components that need them.

## Requested improvements

1. Select ready records from the currently returned page; add missing IDs without toggling earlier selections off. Preserve selections when filters/pages change, and explain what is selected outside the visible page.
2. Give the main queue one applied search/status/page argument. Changing the applied filter returns to the first page. Never label earlier-page rows as the new page while it is loading.
3. Show operator/viewer permission in the demo session. Let the API enforce changes even if a client control is bypassed. Keep useful403/409/422feedback.
4. Maintain one controllable live connection for the operations workspace. Newer records refresh the affected visible queue/detail views. Closing and reopening retrieves the current service state.
5. Save only approved density/default-filter preferences. Migrate the earlier record safely; private order/selection data never goes into browser storage.
6. Verify failures and recovery with repeatable tests and the real browser. Keep the service's sample-only role selectors separate from claims of production authentication.

## Later client request

The independent Bulk Order Priority assignment adds a server-owned priority value and per-order accepted/rejected results. Its complete solution is separate from the guided main.

## Delivery boundaries

No real customer account, payment or paid service is needed for these demonstrations.
