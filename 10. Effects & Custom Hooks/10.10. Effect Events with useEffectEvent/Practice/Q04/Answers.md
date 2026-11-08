# Q04 — Explained answers

## 1. B — Calculate during rendering

- **A:** A duplicate count can disagree with the task array.
- **B:** The count is derived from state React already has.
- **C:** Storage is for persistence, not an ordinary derived value.
- **D:** Cleanup retires external work; it does not calculate UI data.

Revise: 10.01, When to Use Effects.

## 2. B — Include mode

- **A:** Omitting dependencies avoids the real synchronization contract.
- **B:** The title reads mode and must update when it changes.
- **C:** Global data breaks the clear React ownership and does not repair the Effect.
- **D:** Mode genuinely controls the title setup; an Effect Event is not a dependency escape hatch.

Revise: 10.02, Effect Dependencies.

## 3. A — Match listener setup and cleanup

- **A:** An unmatched handler identity or missing removal leaves duplicate listeners.
- **B:** Removing StrictMode conceals a cleanup bug.
- **C:** The task list has no bearing on the window listener's lifetime.
- **D:** Ignoring valid key presses hides the symptom.

Revise: 10.04, Subscriptions & StrictMode.

## 4. B — The callback captured its setup's value

- **A:** A closure does not receive a new binding merely because React rendered again.
- **B:** The faulty interval repeatedly writes 299 from its captured 300.
- **C:** Browser intervals can tick repeatedly.
- **D:** Selection is unrelated to this isolated fault.

Revise: 10.05, Stale Closures & Effect Loops.

## 5. B — Independent Hook calls

- **A:** Each component's Hook call owns its own state.
- **B:** Unmount cleanup stops one timer without resetting the other.
- **C:** No coordination between those local timers is required.
- **D:** Continuing after removal would leak scheduled work.

Revise: 10.07, Custom Hook Design.

## 6. C — Effect Event for the latest name

- **A:** The old name could be stale, and the timer's real dependencies would be missing.
- **B:** Remounting resets the session for an unrelated text edit.
- **C:** Running and remainingSeconds control scheduling; the completion callback reads the latest committed name when it fires.
- **D:** Effect Events are for Effect-related work, not general child click handlers.

Revise: 10.10, Effect Events with useEffectEvent.
