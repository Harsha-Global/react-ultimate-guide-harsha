# Optimistic Updates

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (the accepted title is placed in its detail entry and the list family is invalidated).
- Completed/event-catalog: EventEditor adds a publication control. A second useMutation, stored in publication, calls setPublished(event.id, published) with retry: false. Its async onMutate builds the exact detail key from eventOptions(event.id), awaits cancelQueries for that key, keeps the current record with getQueryData as the snapshot, writes the prediction with setQueryData (a new object, { ...old, published }, or the value unchanged when there is no record) and returns { previous }. onError puts the snapshot back, onSuccess places the complete saved record, and onSettled awaits invalidateQueries for the list family. Both mutations share mutationKey ["events", "write", event.id]; useIsMutating with that key (exact: true) gives activeWrites, and busy is activeWrites > 0, so the title controls and the publication button stay guarded while either write runs, even after leaving and returning to the editor. The title button keeps its own Saving… label from rename.isPending. Below the title form, the publication area shows the current state, the button ("Updating publication…" while pending, otherwise Publish or Unpublish workshop), the error message and "Publication saved.".
- Practice/L06: a separate exercise with a reported issue (Brief.md), a Starter project, Hints.md, a runnable Solution project and Review.md. Try it before reading the hints or the solution, and keep it separate from the main project.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records (the demonstration needs Supper club and Bread and conversation as drafts with their original titles), stop the API, run `npm run reset`, then start `npm run api` again and reload the browser. The reset affects only this copy's saved data. The API is a local course practice server; it makes no real booking and publishes nothing.

## Try it

Open the browser's Network tab (Fetch/XHR). Choose Food and click View Supper club, then click Publish workshop: the badge shows Published at once, the button shows "Updating publication…" and the title controls are disabled; when the server answers 409, the badge returns to Draft and the error explains the missing venue approval. Click View Bread and conversation and publish it: the server accepts it and the published state remains. Unpublish it to check the other direction.
