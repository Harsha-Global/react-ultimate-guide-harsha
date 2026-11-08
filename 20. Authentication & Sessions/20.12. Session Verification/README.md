# Session Verification

The completed application is the exact source demonstrated in the video. This lecture adds no new feature: it verifies the whole session workflow.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (expiry recovery).
- Completed/member-portal: the same project, unchanged, as verified in the video (npm run lint and npm run build pass). Keep it as the completed member-portal checkpoint.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

- Credentials and restoration: submit empty fields, then a wrong password of valid length; sign in as jordan@example.com with PracticeOnly42! and reload the account page. Stop the service and reload to see the failed session check; restart it with `npm run api` and click Try again.
- Addresses and roles: open http://localhost:5200/account?view=plans#autumn while signed out and sign in; try http://localhost:5200/login?returnTo=https%3A%2F%2Fexample.com; as Jordan open /admin and http://localhost:4200/api/admin/summary (403 FORBIDDEN); sign in as rebecca@example.com for the staff overview.
- Cookie, CORS and CSRF: in the browser's Network tools inspect the login request (Access-Control-Allow-Origin, Set-Cookie with HttpOnly and SameSite=Lax, the X-CSRF-Token request header). Send a POST to /api/logout without the token, and one with a foreign Origin: both answer 403.
- Logout and expiry: End this practice session once, sign in again, sign out, sign in as Rebecca; with the service stopped, Sign out reports the failure.
