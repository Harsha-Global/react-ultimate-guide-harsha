# Isolated rendering-failure check

This independent completed booking-studio copy mounts FailureDemo. Copy it to C:\react\render-failure and run `npm ci`, then `npm run dev`. In the normal project the entry remains App.

Click Cause a review render failure. The fallback replaces reviews while the Outside the boundary counter still works. Retry unchanged input remounts the boundary but fails again. Fix input and retry changes the faulty input and remounts the boundary, restoring the reviews. This intentionally demonstrates why resetting an error boundary alone cannot fix an unchanged defect.

The browser console will report the intentional error, including repeated development diagnostics. Do not describe those expected reports as an uncaught whole-page failure. Ordinary event-handler/request errors are explained as separate responsibilities; do not insert a real network service into this isolated example.
