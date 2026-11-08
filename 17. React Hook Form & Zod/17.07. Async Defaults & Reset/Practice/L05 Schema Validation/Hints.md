# Progressive hints

1. This rule needs the parsed ticket count and the guest array together. A rule attached only to the raw number textbox does not have the same view of the whole object.
2. Add an object refinement comparing `ticketCount` with `guests.length + 1`. Give the issue the path `['ticketCount']`. The existing error markup can display it; the existing reset restores the loaded object, including its guests.
