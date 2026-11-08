# Roles & Permissions

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (returning to the requested page after sign-in).
- Completed/member-portal: the same project with a staff workspace: src/api.ts (getAdminSummary for GET /api/admin/summary), src/queryClient.ts (the admin key), src/Guards.tsx (Forbidden and RequireAdmin), src/AdminPage.tsx (the staff overview query with its loading, error, forbidden and data states), src/router.tsx (the admin route inside the session guard and the role guard), src/App.tsx (the Staff workspace link for an admin) and src/safeReturnTo.ts (/admin allowed as a return destination). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with PracticeOnly42!: there is no Staff workspace link, and http://localhost:5200/admin shows the staff-account explanation while Jordan stays signed in; http://localhost:4200/api/admin/summary answers with a FORBIDDEN response. Sign out and sign in as rebecca@example.com: the Staff workspace link opens the membership overview, and a reload shows it again after the session check.
