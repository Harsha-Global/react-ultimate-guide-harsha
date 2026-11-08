# Conditional Validation

Complete isAttendanceValid in exercise.ts. Allow about 5–10 minutes.

This is the cross-field predicate used by the refinement in the Cross-Field Validation & Coercion lecture. The schema has already checked the attendance choice and trimmed the city string. Work with those parsed values; do not add another parser or a form.

Return true for online attendance, including an empty city. For in-person attendance, return true only when the city has at least two characters. Return false otherwise. Do not change the input object.

Examples: online with an empty city is valid; in-person with an empty city or "D" is invalid; in-person with "LA" or "Denver" is valid.

Keep the supplied type, function name, parameters and boolean return type. The grader checks the predicate, not Zod or browser rendering. In the lecture, this predicate belongs in refine, with the issue path set to city.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in this lecture's Practice/C19 - Conditional Validation folder. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
