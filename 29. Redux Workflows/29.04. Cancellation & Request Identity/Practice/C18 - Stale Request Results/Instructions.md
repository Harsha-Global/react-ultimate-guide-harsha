# C18 — Stale Request Results

Issue report: a one-order preview starts first, then a two-order preview becomes the current request. When the old response arrives, it replaces the latest result. Repair completePreview so it accepts a completion only when the state is pending and its requestId exactly matches completion.requestId.

For every ignored completion, return the exact original state object. For an accepted completion, return a new ready state, clear requestId to null and preserve the completion message, including an empty string. Do not mutate either input. Keep the supplied types and function name.

This exercise isolates the request-identity rule taught in Cancellation & Request Identity. It does not claim to test fetch cancellation or Redux middleware. Attempt it before opening the solution. The matching strict TypeScript Starter and Solution are in this lesson's Practice/C18 - Stale Request Results folder, available through the course source-code route explained in How to Download Source Code. In each local copy run npm ci, then npm test. A native pass is evidence for the configured checks, not proof of every compiler option.
