# Booking Studio release checks

- [ ] Run lint, test type checks, automated tests and a production build.
- [ ] Open the built app with the supplied API running.
- [ ] Submit a sample Morning booking and verify the returned confirmation.
- [ ] Open the saved confirmation and reload it while the API process remains running.
- [ ] Check a rejected Evening booking and confirm useful recovery feedback.
- [ ] Record the tested commit and actual verification results.

Demo bookings are stored in memory and reset when the API restarts. Use fictional sample details. A completed checklist records observed checks; it does not run them.

## Hosted check

- Address: https://booking-studio-demo.onrender.com (deployed commit b508aee on main)
- Sample Morning booking confirmed; its confirmation reloaded with the same reference.
- Unknown reference: Booking not found; Try again kept the message; Back to the studio opened the form.
- /assets/missing-course-check.js and /api/reset: 404; /api/health: 200.
