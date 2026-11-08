# Deliberately broken stale timer

Open this isolated copy, start the timer and watch more than one tick. The interval callback keeps the remainingSeconds value from the render that installed it. Compare with the correct main 10.05 `focus-desk/src/TimerPanel.tsx`, whose tick setup includes its reactive inputs and cancels obsolete work. Do not continue Section 10 from this copy.
