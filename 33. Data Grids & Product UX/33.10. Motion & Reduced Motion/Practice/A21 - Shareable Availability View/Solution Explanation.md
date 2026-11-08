# Solution

Availability is parsed by nuqs and derived in useCatalogView. One grouped push update changes availability/page; requests forward the same enum. The server validates it, combines it with name filtering, then sorts/slices; total is the pre-page match count while summary reads the original inventory.

App scopes selected IDs by JSON.stringify([query,availability]). A mismatched scope exposes an empty selection immediately, and an effect clears stored IDs; subsequent Back/Forward cannot revive an earlier selection. Page/sort changes keep scope unchanged. Show all products calls resetFilters; Clear search keeps availability.

Existing request identity/abort/loading/retry and accepted-save behavior remain in place. Tests check data boundaries and forwarding; browser evidence checks actual control/history/focus behavior.
