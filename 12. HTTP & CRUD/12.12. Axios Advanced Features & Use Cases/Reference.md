# 12.12. Axios Advanced Features & Use Cases — reference

- https://axios.rest/pages/advanced/interceptors
- https://axios.rest/pages/advanced/progress-capturing
- https://axios.rest/pages/advanced/cancellation
- https://github.com/axios/axios#fetch-adapter
- https://vite.dev/guide/api-hmr

Teaching sequence:

1. Prepare the supplied experiments
2. Put shared behavior at the client boundary
3. Add instance-scoped interceptors
4. Apply a per-request policy and inspect the result
5. Send a file through the same client
6. Connect a cancellable attachment form
7. Observe progress, cancellation and current adapter support

Axios 1.20.0 is pinned, with npm latest and the installed declarations verified on 27 September 2026. These are current stable capabilities; no claim is made that each feature was newly introduced in this release, or that Axios is universally more popular than native Fetch. No deprecated CancelToken, beta release or experimental HTTP/2 teaching. Axios adds a client policy layer, not a React query cache or automatic state management. Query-library integration is reserved for the planned later section.

Timeout and cancellation stop the client waiting but do not guarantee server rollback. Unknown response data still needs domain validation. A request interceptor registration id differs from the X-Request-Id diagnostic value. Multipart progress can be indeterminate or jump immediately to 100%; only a successful API response confirms acceptance. The Fetch adapter is a per-request transport choice; test runtime-specific support rather than assuming every adapter has identical behavior.
