# Solution walkthrough

`EmployeeRow` receives the same employee and return-address props as the starter. Its own typed fetcher coordinates the row's POST submission. The hidden field sends the inverse of the currently confirmed active flag as a string; the route action validates that string and performs the API PATCH.

The button stays disabled through submitting and loading. The row does not use navigation pending state and does not manually replace the list. Successful action completion revalidates the active list loader, whose result supplies the confirmed badge. Expected errors remain beside the row through fetcher.data.

Compare the complete file in Solution/routed-directory/src/EmployeeRow.tsx. Verify URL preservation, filter preservation, pending feedback, server-confirmed success and retained state on failure. Use the same npm checks as the main project.
