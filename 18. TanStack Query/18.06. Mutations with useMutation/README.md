# Mutations with useMutation

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (dependent venue details, the previous page kept while a new one loads, the next page prepared on hover or focus, and canceled unused requests).
- Completed/event-catalog: a new EventEditor component (src/EventEditor.tsx) edits the selected workshop's title. Its props are the loaded event record, an onRefresh callback and a refreshing flag. The familiar form setup checks the draft with eventEditSchema (at least three characters) and starts from the event's title. useMutation stores the save in rename: its mutationFn returns renameEvent(event.id, title), retry is false, and onSuccess resets the form to the saved title. While rename.isPending the input is read-only and Save title shows "Saving…"; typing in the field calls rename.reset() to clear an earlier save message. A rejected save shows rename.error.message and keeps the draft; an accepted save shows the title from rename.data with a reminder to refresh the displayed records. Refresh details is a separate button (type="button"), disabled while the save or the detail refresh runs. EventDetail renders the editor after the venue details, with onRefresh={() => void query.refetch()} and refreshing={query.isFetching}. src/index.css is the supplied stylesheet with the editor's spacing and feedback styles.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

Saved titles are written to the practice API's data file, so they are still there after a restart. To restore the supplied practice records (for example, to repeat the demonstration), stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR). Choose Food and click View Supper club. Enter a one-character title and click Save title: the field error appears and no PATCH request is sent. Save the title as "Reserved title": the button shows Saving… until the server answers 409, the message appears and your draft stays in the field. Change the title to "Evening supper club" and save it again: the server answers 200 and the success message shows the accepted title. The detail heading and the workshop card still show the earlier title until you click Refresh details and then Refresh events.
