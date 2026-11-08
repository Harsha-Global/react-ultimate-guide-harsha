# Register a Practice Account

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (sign-in, the welcome panel and the awaited sign-out).
- Completed/member-portal: the same project with a registration mode: src/api.ts (register), src/AuthForm.tsx (the mode prop, the extended schema with its name rule, the request chosen by mode and the matching labels) and src/App.tsx (the mode state, the keyed form and the mode switch). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts listed in Service Contract.md and removes every practice account you created. Use made-up practice details, never a real password.

## Try it

Click Create a practice account. Enter a one-letter name and leave the field: "Enter your name." appears. Register with jordan@example.com: the service answers "An account with this email already exists." and focuses the email field. Change the email to alex@example.com and submit: the welcome panel shows the new member account. Sign out and switch between the two modes: earlier errors do not carry over. Sign in again and reload: the form returns, because the app does not restore the session yet (the next lecture does).
