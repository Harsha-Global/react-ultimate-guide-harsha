# Mutation investigation

Keep the original receipt at one while the current early-show quantity increases. Leave the late-show quantity unchanged.

1. Start the complete `Starter/movie-discovery` project in a separate folder below `C:\react`.
2. Reproduce the symptom and predict the responsible state or identity.
3. Make the smallest fix, then repeat the same interaction.
4. Check a neighboring behavior before opening the supplied solution.

Full runnable solution: `Solution/movie-discovery`. Explanation: A copied array still points to the old item. Copy the changed item as well. The impure updater may run more than once in development Strict Mode; do not rely on an exact wrong increment.

Reload the browser before each fresh run; do not rely on Fast Refresh preserving or resetting a particular state. Keep StrictMode enabled.
