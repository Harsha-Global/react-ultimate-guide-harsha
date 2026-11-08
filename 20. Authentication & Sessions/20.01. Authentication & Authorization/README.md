# Authentication & Authorization

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the supplied Cedar Club member portal, a separate teaching project with its own local membership service. This lecture starts it and inspects it; it adds no code.
- Completed/member-portal: the same project at the end of the lecture. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css). The local Manrope font and its license are in public/fonts.

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4200/api/health. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts listed in Service Contract.md and ends every session. Use the sample credentials or made-up practice details, never a real password.

## Try it

On the connection screen, click Check local service: the status reads "The local membership service is ready." Service Contract.md describes the session, sign-in, sign-out, account and staff requests that the next lectures connect.
