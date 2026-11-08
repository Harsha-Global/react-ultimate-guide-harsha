# Private result reused during a partial deployment

Scenario: a new release reuses private results by workspace. Alex and Bob both belong to Studio, but Bob must not see Alex's private orders. Some old application instances still use the faulty result slot. A new release works locally; the old instances remain active.

First answer: stop unsafe result reuse on every serving path, preserve a sanitized trace of requester/scope/result ownership, and verify Bob after Alex on each still-serving version. Confirm the actual exposure with the responsible team; do not assume that signing in is sufficient authorization. Do not put private rows in ordinary logs.

Smallest useful check: Alex/Studio returns O-A1, then Bob/Studio returns O-B1 only; also reverse the request order. Bob/Travel is denied, and revoked Alex is denied despite a previous request. The supplied complete runnable solution uses membership plus current-user/workspace filtering on every call. Run `npm test` in Solution/private-orders. It is an in-process model with trusted session fixtures, not a real authentication or HTTP deployment.

Compatible repair: remove the shared private-result reuse while retaining the established response contract. Deploy that safe behavior to every serving version or drain the unsafe versions before restoring traffic. Invalidate any unsafe shared private-result entries through the reviewed operational path. A working new instance alone does not establish containment. A change to a differently scoped key requires a separate authorization/invalidation review; the focused solution avoids that extra mechanism.

Recovery evidence: both requester orders, both workspace scopes, revoked membership, old and new serving paths, absence of unintended private-result reuse, and controlled failure behavior. Inspect existing exposure and any downstream effects with authorized incident owners. A code rollback to the vulnerable version is not a safe recovery. The local sample proves only its stated filtering contract; deployment and exposure investigation remain proposed actions.

Follow-up: if a response schema must also change, preserve fields consumed by the older live version until it drains. Separate compatibility from authorization; neither substitutes for the other. A direct answer should state the cause, containment, smallest check, compatible repair and remaining uncertainty in that order.
