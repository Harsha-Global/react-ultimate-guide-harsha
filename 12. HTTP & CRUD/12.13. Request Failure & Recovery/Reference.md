# 12.13. Request Failure & Recovery — reference

- https://axios.rest/pages/advanced/handling-errors
- https://axios.rest/pages/advanced/cancellation

Teaching sequence:

1. Rehearse failure and recovery
2. Exercise the write and selection edges
3. Distinguish missing resources from timeouts
4. Recover an attachment attempt
5. Review the endpoint map and close the section

Axios 1.20.0 is pinned, with npm latest and the installed declarations verified on 27 September 2026. These are current stable capabilities; no claim is made that each feature was newly introduced in this release, or that Axios is universally more popular than native Fetch. No deprecated CancelToken, beta release or experimental HTTP/2 teaching. Axios adds a client policy layer, not a React query cache or automatic state management. Query-library integration is reserved for the planned later section.

Timeout and cancellation stop the client waiting but do not guarantee server rollback. Unknown response data still needs domain validation. A request interceptor registration id differs from the X-Request-Id diagnostic value. Multipart progress can be indeterminate or jump immediately to 100%; only a successful API response confirms acceptance. The Fetch adapter is a per-request transport choice; test runtime-specific support rather than assuming every adapter has identical behavior.

## Request-client continuity

React request-client decision — 27 September 2026: Native Fetch is the default for direct application-owned API requests from Section 13 onward. Do not add Axios as a dependency of the later main course projects. Keep 12.11–12.12 as the focused optional Axios alternative; 12.13 completes failure/recovery practice on that Axios app before the project handoff. The supplied Sections 13–14 routed-directory starter already uses Fetch and needs no conversion from the Section 12 app. For later teaching, retain typed request helpers, explicit unsuccessful-status handling, runtime response validation and cancellation where appropriate. TanStack Query should call those Fetch-based helpers; RTK Query should use its supported fetchBaseQuery wrapper; Next.js should use its documented Fetch integration for HTTP data. Teach the planned server actions, server-only database access and provider SDKs for their own responsibilities; do not replace those with unnecessary HTTP wrappers. Keep caching, state ownership and request transport distinct. This is a curriculum consistency choice, not a claim that Fetch universally dominates industry usage or that Axios is unsuitable for production.

Implementation evidence: 13.01 Starter/routed-directory and completed routed-directory, plus 14.08/routed-directory, have six native Fetch calls in src/employeeApi.ts and no Axios dependency.

Official compatibility references checked 27 September 2026: [TanStack Query query functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions), [RTK Query fetchBaseQuery](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery), and [Next.js data fetching](https://nextjs.org/docs/app/getting-started/fetching-data). The choice of Fetch as the course default is an authoring decision; these sources establish supported integrations, not a market-share ranking.
