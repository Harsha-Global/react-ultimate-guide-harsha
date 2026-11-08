# Wait for the Session

Repair selectSessionScreen in exercise.ts. Allow about 5–10 minutes.

On reload, the starter shows the login screen while the server is still checking the session. It also treats a failed check as an ordinary sign-out. Use the four states taught in the Restore the Session lecture.

Return "checking" for status "checking", "retry" for status "error", "account" for status "authenticated", and "login" only for status "anonymous". Do not infer sign-in from a stored name or ignore a failed check. Each call must use the current state, without remembering an earlier result or mutating the input.

The helper selects a screen; it does not perform authentication or authorize an API request. The server confirms the session. The lecture app renders the appropriate component from this same state decision. Router redirects are introduced in the later Guard Member Routes lecture and are not required here.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 20. Authentication & Sessions/Restore the Session/Practice/C25 - Wait for the Session. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
