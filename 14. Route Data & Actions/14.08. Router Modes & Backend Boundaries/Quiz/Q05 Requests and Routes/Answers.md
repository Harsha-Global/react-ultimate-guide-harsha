# Answer explanations

1. **B** — A request failure does not establish that the server returned an empty collection. Communicate the failure and offer a bounded user-driven retry.

2. **C** — The router coordinates navigation results and supplies a cancellation signal. Forward it to fetch. Cancellation can stop unnecessary client work, but does not guarantee rollback of completed server operations.

3. **A** — Search parameters travel with the URL. Location state is optional history-entry context and is not included in a copied address.

4. **D** — The router owns this data-loading lifecycle. These loaders execute in the browser and call a separate API. Static typing does not replace runtime response validation.

5. **A** — A fetcher submits without a page navigation and owns its pending/data state. The action calls the API PATCH; successful normal revalidation supplies the updated employee list.

6. **C** — Client UI checks can improve the experience but can be bypassed. The backend must enforce permissions, authentication and validation for the operation it accepts.
