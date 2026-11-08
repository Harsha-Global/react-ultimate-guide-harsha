# Restore the Requested Page

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the guarded account route).
- Completed/member-portal: the same project returning to the requested page after sign-in: src/safeReturnTo.ts (the return-value checks with the /account fallback), src/Guards.tsx (the requested path, search and hash carried to /login as an encoded returnTo value) and src/PublicPages.tsx (AuthScreen reads returnTo through safeReturnTo and keeps it on the alternate login/registration link). Keep it for the next lecture.
- Practice/C26 - Safe Return Destinations: the coding exercise for this lecture (Starter and Solution).
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Signed out, open http://localhost:5200/account?view=plans#autumn: the login address carries it as an encoded returnTo value. Switch to registration and back, then sign in as jordan@example.com with PracticeOnly42!: the app returns to /account?view=plans#autumn. Sign out and open http://localhost:5200/login?returnTo=https%3A%2F%2Fexample.com: after sign-in the app uses /account and never opens the external address.
