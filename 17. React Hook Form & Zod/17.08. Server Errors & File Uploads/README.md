# Server Errors & File Uploads

The completed application is the exact source demonstrated in the video.

- Starter/event-registration: the attendee editor from the previous lecture (asynchronous default values and reset).
- Completed/event-registration: the editor saves through saveAttendee. A rejected email (409) is shown beside the email field with focus, a general message appears above the actions, and the draft is kept. A successful save becomes the new reset baseline. An image is uploaded through the AvatarUpload component (connected with a Controller for avatarUrl) and attached by a separate save. Inputs and actions are unavailable while a save or an upload is running.
- Supplied API/server/seeds.mjs: the updated practice records (each has an empty avatarUrl).
- Helpers: the updated attendees.ts (saveAttendee, ApiError, uploadImage) and the AvatarUpload component, copied into src.
- Sample Uploads/workshop-badge.png: the image used for the upload check.
- Styles: the prepared stylesheet.
- Practice/C20 - Server Error Feedback: the local companion to the coding exercise (Instructions, Hints, Explanation, Starter, Solution).

## Run

Copy an application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4087 and check http://localhost:4087/api/health. In a second terminal run `npm run dev` and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. This removes saved practice edits and uploads in that copy. The API is a local course practice server; it makes no real reservation or payment.

## Try it

Change Alex's name, enter taken@example.com and click Save attendee: the email message appears with focus on the field and the changed name stays. Correct the email and save again, then reload: the saved values return. Choose Sample Uploads/workshop-badge.png and click Upload image: the image appears. Click Save attendee to attach it, then reload. Try an unsupported file to see the upload message. Finally, choose a file without uploading it and click Reset to saved details: the selected file clears with the other changes.