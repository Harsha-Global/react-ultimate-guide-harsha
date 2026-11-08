# Invalidation & Cache Updates

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (the title editor saves, but the displayed records need a manual refresh).
- Completed/event-catalog: EventEditor imports useQueryClient beside useMutation, and eventKeys and eventOptions from ./queries.ts, and calls useQueryClient() for the provider's client. The title mutation's onSuccess is async: it awaits queryClient.cancelQueries for the exact detail key (eventOptions(event.id).queryKey), places the complete saved record into that entry with setQueryData, keeps the form reset to the saved title, and awaits queryClient.invalidateQueries({ queryKey: eventKeys.lists() }), so every cached list (each category, search, sort and page) is marked stale and the active lists refetch from the server. The success message now simply reports the saved title. The existing Catalog refresh-error branch keeps the last available list with Retry refresh if a list refresh fails after an accepted save.
- Practice/C22 - Update the Right Cache Entry: a coding exercise (Instructions.md, Hints.md, Starter, Solution and Explanation.md). Try the Starter first; compare with the Solution afterwards.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

Saved titles are written to the practice API's data file, so they are still there after a restart. To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR). Choose Food and click View Supper club. Change its title to "Evening at River House" and save it: the heading changes as soon as the server accepts the change, and the food list is requested again without either refresh button. Search for "evening": the renamed workshop appears with a total of one. Change the title to "Supper at River House" and save it: the heading shows the accepted title and the current search result becomes empty, because the server rebuilt the list.
