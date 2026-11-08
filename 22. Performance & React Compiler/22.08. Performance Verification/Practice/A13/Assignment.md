# A13 — Isolate a Note Update

Keep note edits independent of the film-results tree, and support the claim with repeatable observations.

## Client request

The prepared regression moved the note state into App. Typing the private note now rerenders MovieResults and repeats the supplied costly ranking work. The note has no role in searching or displaying films.

## Your work

Move the note state and its change handler into NoteEditor. Remove that state and its controlled props from App. Keep the note mounted when search, sorting, paging or film details change. Keep the supplied profiling fixture unchanged in both variants. App and MovieResults opt out of automatic memoization, and the results render runs the same deliberately costly ranking function from the section. This makes the effect of note ownership observable; your task is to move the note state, not alter that workload. Do not remove result features or add arbitrary delays.

## Start and check

Use npm run build:profile, then npm run preview, and open http://127.0.0.1:5250. Stop the other comparison server before starting the next variant. No API service is required.

1. Use npm run build:profile, followed by npm run preview. Open the supplied measurement panel.
2. In the starter, clear observations, type the same short note, and record MovieResults update entries. Repeat three times with the same input and setup.
3. Repeat those three trials in the solution. Note edits should no longer cause MovieResults update entries. Report measured durations as observations, without claiming a universal speedup.
4. Change search, sort and page, and toggle a saved film. Those result interactions must still work and produce the relevant updates.
5. Keep the typed note while changing filters, opening/closing details and paging. Check empty results, then build and lint.

## Submit your explanation

1. What did you change?
2. Which checks did you run, and what did you observe?
3. Why does your chosen state owner or validation boundary fit this requirement?

Use the course source-code route in How to Download Source Code. The starter and full separate solution belong to this lecture’s Practice/A13 folder. Attempt and test your work before opening Solution. This is a manually reviewed assignment, not an automatic grader or an extra recorded solution lecture.
