# Restore the Session

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (sign-in and registration modes, with the user kept only in App state).
- Completed/member-portal: the same project with one shared session owner: src/Auth.tsx (AuthProvider with the checking, authenticated, anonymous and error states, the restoration effect with its abort cleanup and retry, useAuth and SessionStatus), src/SignOutButton.tsx (the sign-out handler moved out of App), src/main.tsx (App inside AuthProvider) and src/App.tsx (the screens chosen from the checked session). Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).
- Practice/C25 - Wait for the Session: the local companion to the coding exercise (Instructions, Hints, Explanation, Starter, Solution).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

Sign in as jordan@example.com with PracticeOnly42! and reload: the session is checked first, then the welcome panel returns. Sign out and reload: the form appears. Stop the API (Ctrl+C in its terminal) and reload: the app shows "We couldn't check your session." with Try again. Restart the API and click Try again: the service confirms an anonymous visitor, because restarting it ended the earlier sessions.
