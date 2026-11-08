# A rejected price stays in the catalog preview

This is a separate, deliberately faulty copy of the project for the bug investigation. Keep your main project as it is; use this copy only for the exercise.

Start the faulty project using the normal supplied API and app commands. Reset the API seed first. Open Inventory, then Edit Trail Backpack. Change the price from 79 to 13 and save. The API rejects this sample promotional price. The form shows the rejection, but the catalog preview keeps 13 instead of restoring 79. The editable draft should keep 13 so the learner can correct it; the saved catalog preview should show 79.

Investigate the responsibilities separately: the form owns the draft, the detail query owns the catalog preview, and the server rejects the proposed price. onMutate already cancels the detail read, captures the previous record and installs an optimistic value. The faulty onError reports the error but omits the cache restoration. Invalidating list keys does not repair the separate detail key.

Restore the snapshot in onError, using the same detail key. Reproduce the rejection again: preview 79, editable draft 13 and price focus. Then save 89 successfully, change the draft to 91 and reset; 89 is now the saved baseline. Inventory, bag and checkout should receive the accepted price. Reset the API seed and reload after the demonstration. Use the Fixed project for the complete repair.
