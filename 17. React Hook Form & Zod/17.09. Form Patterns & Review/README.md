# Form Patterns & Review

This review lecture makes no source change: the completed application is the exact source demonstrated in the video, identical to the previous lecture's completed project.

- Completed/event-registration: the attendee editor reviewed in the video. Native inputs use register, the SessionPicker and AvatarUpload components connect through Controller, and the guest rows use useFieldArray with field.id keys. Saves go to the practice API: an invalid draft sends no request, the reserved email is rejected with 409 while the draft is kept, and a successful save (200) becomes the reset baseline.
- Starter/event-registration: the same project, as delivered with the previous lecture.
- Sample Uploads/workshop-badge.png: an image for the upload field.
- Styles: the prepared stylesheet.

The optional ticket-count extension shown in the video belongs to the Schema Validation lab delivered with the Async Defaults & Reset lecture (Practice/L05 Schema Validation); the main project does not include it.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4087 and check http://localhost:4087/api/health. In a second terminal run `npm run dev` and open the local address Vite prints (port 5187). Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real reservation or payment.

## Try it

Open the browser's Network panel. Clear the name and click Save attendee: the field message appears and no request is sent. Enter Alex Reviewed with taken@example.com and save: the request returns 409, the email message appears and the name stays. Correct the email to alex.reviewed@example.com and save: the request returns 200. Change the name and click Reset to saved details: Alex Reviewed returns. Choose an image without uploading it, then reset: the selected file clears.