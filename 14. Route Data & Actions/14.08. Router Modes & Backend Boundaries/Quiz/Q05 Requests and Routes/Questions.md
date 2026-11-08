# Requests and Routes — knowledge check

Choose one answer for each question. Attempt before opening Answers.md.

## 1. A list request fails because the API is stopped. What should the page show?

A. An empty-success result saying there are no employees.
B. A request-failure message with a recovery path.
C. An unchanged loading message forever.
D. A success notification because fetch was called.

## 2. The user opens one detail then quickly chooses another destination. What is the best explanation?

A. Aborting a request rolls back every server operation.
B. Every earlier response should still overwrite the latest screen.
C. Pass the router request signal to fetch and let the latest navigation determine the destination.
D. Disable all links until every earlier request finishes.

## 3. A colleague should reopen the same name and team filters from a copied address. Where should those choices live?

A. In search parameters.
B. Only in a component variable.
C. Only in location.state.
D. In the button color.

## 4. In this Vite Data Mode app, what happens when a loader provides data?

A. The loader becomes a protected backend endpoint.
B. TypeScript automatically validates every JSON body.
C. The destination must first render an Effect to run its loader.
D. The browser router runs the matched loader and provides its result to the page through useLoaderData.

## 5. A list-row status change should keep the URL and filters, show row-specific pending feedback, then reflect server data. What fits?

A. Use a fetcher form to the status action and let successful action revalidation refresh the list.
B. Always navigate to a different page first.
C. Set the badge to success before sending the request and ignore errors.
D. Use location.state as the database.

## 6. Where must a real application enforce authorization to update an employee?

A. Only in the NavLink styling.
B. Only in the unsaved-change blocker.
C. At the backend operation that accepts the update.
D. In a client route action name.
