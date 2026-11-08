# Repair the release label

The production footer still says “Local preview”, although `.env.production` contains the public `VITE_RELEASE_LABEL` value. Repair `src/release.ts` so production builds use that value and local development still has a sensible fallback when the setting is missing or empty. Keep this as a public display value; do not put a secret into a browser variable.

Open `Starter/booking-studio`. Run `npm ci`, then `npm run build` and `npm run verify:production`. The supplied verification should fail on the incorrect label. Repair the one source file, rebuild, and rerun the verification. Check the visible footer with `npm start` too. Stop that server before running another automated check.

Acceptance: the production build contains “Course demo”, development without the value shows “Local preview”, the rest of the booking/API checks still pass, and no localhost API URL is added. Explain why changing an environment file after a build requires another build.

Hint: inspect the environment object that Vite provides to browser source and keep the fallback for a missing or empty string. Try the task before opening `Solution/booking-studio`. Time: 10–15 minutes. This is a local coding exercise, because the hosted Udemy editor cannot reproduce the Vite build and Node production adapter.
