# Recover an Expired Session

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (private cleanup that finishes before the next identity is accepted).
- Completed/member-portal: the same project with expiry recovery: src/Auth.tsx (getVersion and expireIfCurrent: a 401 from a private request ends the session only when it belongs to the current session version, with the message "Your session has ended. Sign in again."); src/AccountPage.tsx and src/AdminPage.tsx (each private read captures the version and reports a 401 before passing the error on; a practice control ends the local practice session); src/api.ts (expirePracticeSession). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with PracticeOnly42! and open My account. Click "End this practice session" once: the next account request confirms the expiry and sign-in returns with "Your session has ended. Sign in again.", while the address keeps returnTo=%2Faccount. Sign in again to load fresh account data, then sign out normally and sign in as rebecca@example.com: her page shows her own saved gathering.
