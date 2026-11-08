# Quote observation — 08.04

This separate demonstration uses the lecture's completed main project with one change: the quote timeout in `src/BookingPanel.tsx` is 8000 milliseconds instead of 2000. The longer simulated delay gives time to edit the controls before the captured result appears. The main project keeps 2000 milliseconds, and later lectures continue from it.

Copy this `movie-discovery` project into `C:\react\quote-observation`. Stop the previous server, open this folder in VS Code, run `npm ci` if dependencies are missing, then `npm run dev`. Open the printed Local URL and fully reload.

1. Enter Emily, keep 18:00, and use one ticket. The current total is $12.
2. Before activating Prepare quote, note the edits you will make: David, 21:00, three tickets.
3. Activate Prepare quote and make those edits during preparation. The current summary is now $45. The request button is disabled; the inputs remain editable.
4. Wait for the result. The prepared quote still contains Emily, 18:00, one ticket and $12.
5. Request another quote. The earlier card disappears during preparation. After the delay, the new card contains David, 21:00, three tickets and $45.
6. Wait for completion before stopping the server. Continue with the separate delayed-increment example, `Demonstrations/delayed-stale/movie-discovery`; return to the main project when finished.

The delay is nominal; browser scheduling may run the callback later. No network booking request is made. This example demonstrates intentional request-time history, not a faulty quote that should be rewritten to show current choices.
