# Guard Member Routes

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the account page loading the member's private plans).
- Completed/member-portal: the same project with routes: src/Guards.tsx (RequireSession: the status screen while the session is checking or failed, a replacing redirect to /login for a confirmed anonymous visitor, otherwise the Outlet), src/PublicPages.tsx (Home, AuthScreen for login and registration, NotFound), src/App.tsx (the shared layout with header links and the Outlet), src/router.tsx (the route tree with the account route inside the session guard) and src/main.tsx (RouterProvider inside the existing providers). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign out and open http://localhost:5200/account directly: the session check finishes, then the app replaces the address with /login. Sign in as jordan@example.com with PracticeOnly42!: the account page opens at /account. Reload it: the restored session shows the account page again. Open http://localhost:5200/missing: the not-found page links back home.
