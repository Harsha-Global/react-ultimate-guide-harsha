# Missing listener cleanup

This isolated fault removes only the listener cleanup from TimerPanel.tsx. Run this copy under development StrictMode, press Alt + Shift + P, and compare with the restored solution at `Solutions/missing-cleanup/focus-desk` at the ZIP root. Extra setup cycles can reveal the leftover listener. Keep the main focus-desk as the correct checkpoint.
