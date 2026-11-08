# Private-result investigation — complete runnable solution

Use the already-installed Node.js 24. Copy this project to `C:\react\private-result-solution` on Windows, or a separate local folder whose full path, including every parent folder, contains no `&` character. No package installation or database is required. Run `npm test` in the copied folder; the complete solution should pass.

The checks cover Alex/Bob in both request orders, workspace scope, a missing session and membership revoked after a previous request. Membership and current-user/workspace filtering run on every call. This is a focused in-process test with trusted synthetic sessions and data. The worked investigation describes the additional containment, deployment and exposure evidence needed outside this local example.
