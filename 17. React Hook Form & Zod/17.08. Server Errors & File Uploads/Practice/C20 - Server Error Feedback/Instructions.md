# Server Error Feedback

Repair reportSaveError in exercise.ts. Allow about 10 minutes.

The attendee service can return an ApiError with a fieldErrors.email message. The broken helper puts every error only at the top of the form, so the visitor cannot see which field needs attention.

For an ApiError with a nonempty email message, first call setError("email", { type: "server", message: the email message }, { shouldFocus: true }). Then, for every failure, call setError("root.server", { type: "server", message: the general message }). Use error.message when the value is an Error; otherwise use "Could not save. Your draft is still here.".

For an ApiError without an email message, or an ordinary Error, make only the root.server call. Never invent a field error for an unrelated failure. Keep the field message and general message distinct. Do not mutate the error or add a form reset.

The supplied callback type matches the setError calls taught in the Server Errors & File Uploads lecture. The grader records those calls; it does not load React Hook Form or run a server.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 17. React Hook Form & Zod/Server Errors & File Uploads/Practice/C20 - Server Error Feedback. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
