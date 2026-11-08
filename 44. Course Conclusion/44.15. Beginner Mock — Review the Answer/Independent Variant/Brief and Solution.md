# Attendee-name editor

Try Starter first. Two attendees share the display name Alex; each has a distinct ID. Edit a-1 to Alex Rivera, reverse the order, filter it out and back in, preserve a blank edit, then Reset. The agreed policy is that temporary filtering preserves drafts; permanent removal discards that attendee's draft. Reset restores the original names of the remaining attendees; it does not restore a removed attendee. Full reload resets this entire local sample.

Solution uses stable IDs for keys and parent-owned string drafts keyed by ID. `??` distinguishes a missing draft from an empty one. Removing a-1 deletes its draft entry; the visible list excludes it. The input is controlled by that parent. A different policy is valid only if the brief and checks are changed explicitly.

Checks: a-1 keeps Alex Rivera through sort/filter; a-2 remains Alex; blank remains blank through filtering; Reset restores original names; permanent removal followed by Reset does not resurrect a-1. Source setup is in each project README. This is a complete optional solution, separate from the product-picker mock.
