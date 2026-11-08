# Clear Earlier Private Data

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the staff workspace and its role checks).
- Completed/member-portal: the same project with private cleanup that finishes before the next identity is accepted: src/Auth.tsx (a version ref; commit sets the checking state, awaits the cancellation of private requests and stops when a newer session change has started, before removing private entries and storing the new state). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with PracticeOnly42! and open My account, then sign out and sign in as rebecca@example.com: her page shows her own plan, never Jordan's. With the member area open, stop the service (Ctrl+C in its terminal) and click Sign out: the message says the sign-out failed and the app stays signed in. Restart the service with `npm run api` and click Sign out again: the anonymous result completes the flow.
