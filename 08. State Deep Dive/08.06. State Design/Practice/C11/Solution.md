# Stale Derived Values — explanation

Quantity is the stored choice. Total has no independent lifecycle, so remove its state and derive it during render. An effect or a second setter would create synchronization work that this calculation does not need.

Compare `Native/Starter/App.jsx` and `Native/Solution/App.jsx`, or the equivalent `src/App.tsx` files in the complete local projects. Test the behavior, including the nearby actions that must keep working. This practice never replaces the lecture's main project.
