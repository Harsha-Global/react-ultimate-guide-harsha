# Safe Return Destinations

Complete safeReturnTo in exercise.ts. Allow about 10–15 minutes.

The login flow receives a decoded returnTo value. Use the same policy as the Restore the Requested Page lecture: the only allowed pathname at this point is /account. Preserve its search string and hash. Use /account as the fallback for rejected input.

Reject an empty or null value, input longer than 2048 characters, a value without a leading /, a value beginning with //, and any value containing a backslash or a control character from U+0000 through U+001F. Then parse the candidate with new URL(value, APP_ORIGIN) inside try/catch. Accept it only when the parsed origin equals APP_ORIGIN and the parsed pathname equals /account. Return pathname + search + hash; return the fallback if parsing fails or a check fails.

APP_ORIGIN is a fixed test origin replacing the browser's location.origin. Do not fetch, navigate or decode the value again. /account/settings, /account-evil and the login page are not allowed. A query value containing a website address is still only query data when the destination itself remains the allowed account page.

Keep the supplied function signature. These checks enforce this app's return-navigation policy; they are not a replacement for server authorization.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 20. Authentication & Sessions/Restore the Requested Page/Practice/C26 - Safe Return Destinations. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
