# Compare your implementation

The solution's addReviewPreview reducer produces a new displayed list from the confirmed base and draft. It uses clientId for preview identity and skips an identifier already present in the current base. The setter runs within the form Action before postReview. The list reads optimisticReviews and labels only temporary records. Once the server responds, the existing saved-list updater adopts its authoritative record. If the server rejects, that updater does not run: the temporary addition ends, while controlled fields and the explicit error remain.

A failed response is not proof that a server write never happened. The supplied request client explains recovery and the server recognizes identical retries by clientId. This local example does not implement an offline queue, durable storage or general multi-user ordering. A preview cannot reverse a server write. For costly or irreversible operations, showing a pending state may be the better choice.

Manual comparison: initial Maya/Sam; ordinary review→temporary Sending→one saved row; link-containing review→temporary Sending→error and no extra saved row; remove link→one accepted row; reload→same saved list. Build/lint checks alone do not establish those browser behaviors.
