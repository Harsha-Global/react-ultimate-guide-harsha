# Check Sign-In Inputs

The completed application is the exact source demonstrated in the video.

- Starter/member-portal: the Cedar Club member portal as completed in the previous lecture (the service connection screen).
- Completed/member-portal: the same project with the local sign-in form: src/AuthForm.tsx (new) and src/App.tsx, which shows the form in place of the connection check. Keep it for the next lecture.
- Styles: the prepared stylesheet (already in src/index.css).

## Run

Copy member-portal into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`. In a second terminal run `npm run dev` and open http://localhost:5200. Use localhost for both addresses. Validate with `npm run lint` and `npm run build`.

The service keeps its practice accounts and sessions in memory: restarting it restores the two sample accounts listed in Service Contract.md. Use the sample credentials or made-up practice details, never a real password.

## Try it

Click Check sign-in details with both fields empty: the email and password messages appear and focus moves to the first invalid field. Enter jordan@example.com with a short password: the password message stays. Enter a practice password of at least 12 characters and submit again: the status reads "Sign-in details passed validation. No request has been sent." Change the email once and the message clears. This form only checks the input rules; the next lecture sends the values to the service.
