# Solution explanation

Array copying is shallow. Build the update with map and return {...item, quantity: ...} for the matching item and the original object for each unaffected item. The helper neither writes to the input nor drops unrelated rows.
