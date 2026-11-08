# Hints

1. A row mutation should use `useFetcher`, not the page-navigation `useNavigation` state.
2. Import the action with `import type` and provide `typeof toggleEmployeeAction` to the hook.
3. Use the fetcher's Form component. Its action address includes the encoded employee id and `/status`.
4. Both submitting and loading are busy phases. Read the current badge from the loader-provided employee prop.
5. `fetcher.data?.error` supplies expected errors returned by the action. A successful response clears the error and normal revalidation obtains new list data.
