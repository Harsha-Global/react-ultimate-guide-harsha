# Unstable Key investigation

Keep a typed note through a compact-layout toggle; clear it for a different showtime.

1. Start the complete `Starter/movie-discovery` project in a separate folder below `C:\react`.
2. Reproduce the symptom and predict the responsible state or identity.
3. Make the smallest fix, then repeat the same interaction.
4. Check a neighboring behavior before opening the supplied solution.

Full runnable solution: `Solution/movie-discovery`. Explanation: Keep the key tied to showtime, not to the layout setting.

Reload the browser before each fresh run; do not rely on Fast Refresh preserving or resetting a particular state. Keep StrictMode enabled.
