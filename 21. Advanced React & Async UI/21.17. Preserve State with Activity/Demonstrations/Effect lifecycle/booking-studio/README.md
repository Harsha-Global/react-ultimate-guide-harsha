# Activity effect lifecycle demonstration

This is an isolated teaching instrument, not a production timer. Copy it to a separate Windows folder under C:\react. Run npm ci, then npm run dev; open http://localhost:5210. No API is required.

Enter My first bowl. Wait for the received-callback counter to increase. Select Hide draft: the field disappears, the final event is cleanup, and the counter stops changing. Select Show draft: the field retains its text, a new setup event appears, and the counter resumes. Repeated toggles should not accumulate extra live intervals. The development StrictMode setup-cleanup-setup sequence is expected. The parent callbacks have stable identities so its counter renders do not restart the child's effect. This prepared instrumentation is inspected, not typed as a new memoization lesson. npm run build and npm run lint verify the source.
