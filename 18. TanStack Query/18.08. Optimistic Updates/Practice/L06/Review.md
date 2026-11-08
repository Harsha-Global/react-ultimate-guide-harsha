# Solution review

The starter saves a snapshot and predicts the detail-cache flag, but its error callback does nothing. The API rejects the write, so the server remains unchanged. List invalidation does not restore that separate detail entry. The solution's onError callback uses the third callback parameter, the object returned by onMutate, and restores its previous record to the exact detail key. A guard avoids writing an absent snapshot.

The optimistic updater creates a new object, preserving the snapshot. Before the prediction, exact detail reads are canceled. Success replaces the prediction with the checked full server response. Settlement invalidates the list family. The shared mutation key and useIsMutating count guard writes to the same event across editor remounts within this browser client.

A page reload, suppressing the error, or displaying a permanently local badge does not repair this cache transition. Compare the full source in Solution/event-catalog. Verify the rejected e3 path and the accepted e6 path; explain both with the server response and visible badge as evidence.
