# Connect Sign-In & Sign-Out

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the sign-in form that only checks its input rules).
- Completed/member-portal: the same project connected to the cookie-session service: src/api.ts (getSession, sessionPost, login and logout), src/AuthForm.tsx (the onSession prop, server errors and the alert message) and src/App.tsx (the accepted user, the welcome panel and the awaited sign-out). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts listed in Service Contract.md and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with a valid-length wrong password such as WrongPractice42!: the service rejects it, the form keeps the email and shows "The email or password is incorrect." Correct the password to PracticeOnly42! and submit again: the welcome panel shows the name, email and account type returned by the service. Click Sign out: the form returns only after the service accepts the logout.
