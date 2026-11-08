# Solution explanation

The two added branches preserve the distinction between an unfinished check, a failed check and a confirmed anonymous session. An authenticated result selects the account screen. Each call reads the current state, so retry and logout naturally change the decision. This is client-side presentation logic; it does not replace the server's authentication or permission checks.
