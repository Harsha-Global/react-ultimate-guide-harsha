# 10.10. Effect Events with useEffectEvent

The timer Effect controls its schedule with running and remainingSeconds. At completion its scheduled callback calls an Effect Event, reading the latest committed displayName without making the name a scheduling dependency. Reset clears the notice.

## Projects

- focus-desk: completed main, normal durations.
- Starter/focus-desk: completed 10.09.
- Demonstrations/short-session/focus-desk: supplied three-second comparison.

Keep the panel key based on mode and duration. Do not call the Effect Event from a button handler or pass it to a child. Read Practice/Q04/Questions.md before Answers.md. Each project runs independently with npm ci and npm run dev. npm run check, npm run lint and npm run build verify the source. Dependencies, builds, narration and production artifacts are excluded.
