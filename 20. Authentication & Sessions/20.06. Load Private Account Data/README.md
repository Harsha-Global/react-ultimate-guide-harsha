# Load Private Account Data

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the shared AuthProvider that restores the session).
- Completed/member-portal: the same project loading the confirmed member's private plans: src/api.ts (getAccount with the owner check), src/queryClient.ts (the private query keys and one shared QueryClient), src/Auth.tsx (earlier private entries removed when the accepted identity changes), src/AccountPage.tsx (the account query and its loading, error, data and refresh states), src/main.tsx (QueryClientProvider around AuthProvider) and src/App.tsx (the account page for an authenticated user). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with PracticeOnly42!: the account page shows Jordan's saved gatherings. Click Refresh saved plans: the label reads "Refreshing…" while the plans stay on screen. Sign out and sign in as rebecca@example.com: the page shows her own plan (Community supper), never Jordan's cached result.
