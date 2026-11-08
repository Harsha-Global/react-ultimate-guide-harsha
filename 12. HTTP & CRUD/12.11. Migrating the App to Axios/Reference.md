# 12.11. Migrating the App to Axios — reference

## Optional client choice

Axios is an optional third-party request client, not a React prerequisite. The current 12.10 source already implements the complete request workflow with native Fetch and has no Axios dependency. Client choice varies by company and project; this lesson teaches an alternative and its practical tradeoffs, without claiming universal use or a market-share ranking.

Official references: [Axios installation](https://axios.rest/pages/getting-started/first-steps) and [React data-fetching guidance](https://react.dev/reference/react/useEffect#fetching-data-with-effects). Reviewed 27 September 2026. The optionality conclusion is also directly supported by the incoming working source.

- https://axios.rest/pages/getting-started/first-steps
- https://axios.rest/pages/advanced/handling-errors
- https://axios.rest/pages/advanced/cancellation

Teaching sequence:

1. Change the request client, keep the app's contract
2. Install Axios and create one client
3. Keep a stable error contract
4. Migrate list and detail requests
5. Migrate every write and retain clear feedback
6. Verify the complete migration

Axios 1.20.0 is pinned, with npm latest and the installed declarations verified on 27 September 2026. These are current stable capabilities; no claim is made that each feature was newly introduced in this release, or that Axios is universally more popular than native Fetch. No deprecated CancelToken, beta release or experimental HTTP/2 teaching. Axios adds a client policy layer, not a React query cache or automatic state management. Query-library integration is reserved for the planned later section.

Timeout and cancellation stop the client waiting but do not guarantee server rollback. Unknown response data still needs domain validation. A request interceptor registration id differs from the X-Request-Id diagnostic value. Multipart progress can be indeterminate or jump immediately to 100%; only a successful API response confirms acceptance. The Fetch adapter is a per-request transport choice; test runtime-specific support rather than assuming every adapter has identical behavior.

## Later course projects

Native Fetch is the default for direct API requests after Section 12. The Axios migration and advanced examples remain useful optional-client training. Finish the current Axios example in 12.13, then use the separate Fetch-based routing starter without copying Axios configuration.
