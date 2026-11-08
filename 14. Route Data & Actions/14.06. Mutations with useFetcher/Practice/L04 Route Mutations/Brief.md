# Route Mutations — build practice

Complete one employee row so the user can change its active status without leaving the current list.

Copy `Starter/routed-directory` to `C:\react\route-mutations-practice`. Stop the main app/API before running this copy because it uses the same ports. Run `npm ci`, then `npm run api` and `npm run dev` in separate terminals. Use the supplied styling; focus on behavior.

Already supplied: employee types, API request helpers, list/detail loaders, save action, `toggleEmployeeAction`, its `/employees/:employeeId/status` route, URL filters, row extraction and contextual CSS. Complete `src/EmployeeRow.tsx`.

Acceptance criteria:

- Each row owns a typed fetcher and submits POST to the supplied status action.
- Submit the opposite boolean as the explicit string `true` or `false`, using a named hidden field.
- The pending row shows Updating… and prevents another submission; other rows retain their independent controls.
- Success revalidates the list and displays the confirmed server badge. Do not change the badge optimistically for this exercise.
- The page URL and current filters stay unchanged.
- A failed API request displays that row's error, retains the confirmed badge and permits another attempt.
- Links keep their existing return context. Use warning styling for deactivation and success styling for activation; text labels must identify the action too.

Try `/employees?q=Avery`, submit the change, then stop only the API after loading the list to test failure. Restart the API and retry. Restart resets the sample records; the next loader result should reflect that server state.

Attempt first. Use Hints.md if needed. The full solution is at `Solution/routed-directory` beside this practice brief in the course repository. Do not open it until you have tried the behavior.
