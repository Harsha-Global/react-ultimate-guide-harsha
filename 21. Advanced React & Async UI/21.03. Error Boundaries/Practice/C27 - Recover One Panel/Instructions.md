# Recover One Panel

The supplied session panel can fail while rendering. The boundary currently removes the visit note along with that panel. Change the boundary placement in App so that only SessionDetails is replaced by the recovery message.

Enter a note, click Break session panel, and check that the same note remains visible and editable. Click Try again: the session panel should return, and the note should still be present. Keep the supplied error boundary, note state and panel behavior. Do not hide the error, remove the failing button, store a second copy of the note, or reload the page.

This boundary handles the supplied rendering failure. It is not a general handler for every asynchronous or event-handler error. The native React 18 environment is sufficient for this task; it does not use newer React APIs.

Attempt the task before opening the solution. The local Starter and Solution are inside 21. Advanced React & Async UI/Error Boundaries/Practice/C27 - Recover One Panel. Use the course source-code route described in How to Download Source Code. The local companion includes strict TypeScript checking. The hosted result does not establish strict null safety.
