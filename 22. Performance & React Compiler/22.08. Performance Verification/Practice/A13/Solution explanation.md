# Solution and reasoning

NoteEditor now owns the only note value and its handler. Its updates can stay inside that component instead of rerendering App and the results subtree. The result state, filtering, pagination and saved-film behavior remain in their existing owners. Keeping the same component type, key and position lets the note survive unrelated parent updates.

Moving state helps when the value belongs to a smaller part of the interface. Keep state in a shared owner when other components actually need that value. The supplied Profiler measures React work; event-to-frame observations are not paint time or INP. Do not interpret one noisy timing as proof.

## Checks

- Use npm run build:profile, followed by npm run preview. Open the supplied measurement panel.
- In the starter, clear observations, type the same short note, and record MovieResults update entries. Repeat three times with the same input and setup.
- Repeat those three trials in the solution. Note edits should no longer cause MovieResults update entries. Report measured durations as observations, without claiming a universal speedup.
- Change search, sort and page, and toggle a saved film. Those result interactions must still work and produce the relevant updates.
- Keep the typed note while changing filters, opening/closing details and paging. Check empty results, then build and lint.
