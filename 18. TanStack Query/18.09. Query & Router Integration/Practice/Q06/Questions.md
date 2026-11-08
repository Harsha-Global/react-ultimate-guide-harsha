# Q06 — Forms and Caching

Try these six questions before opening AnswerKey.md. They revisit ownership choices before the checkout project. This is a self-check, not a platform-enforced progression gate.

## 1. The header, cart page and checkout summary must show the same cart quantities immediately. Which owner fits this client-side data?

- **A.** One reducer-backed cart owner shared through context, with all three views reading it.
- **B.** Three independent useState copies that each save to local storage.
- **C.** A separate query key for each header render.
- **D.** The checkout form owns the cart, and the header reads the form DOM.

## 2. A helper asserts an unknown JSON body as EventItem. Which change establishes runtime confidence in the response shape?

- **A.** Annotate a second variable with EventItem.
- **B.** Run the body through the event schema and handle a failed parse.
- **C.** Put EventItem in the query key.
- **D.** Use a longer staleTime.

## 3. The same list endpoint receives category=food on page1 and category=food on page2. How should the query keys reflect those requests?

- **A.** Use one constant events key because the endpoint path is the same.
- **B.** Include only the category; pagination is visual state.
- **C.** Include the normalized category, page and every other value that changes the requested result.
- **D.** Use a random key every time to guarantee a new request.

## 4. A title PATCH returns the complete accepted event. That title can change list search matches and page order. Which update path matches the example?

- **A.** Replace the exact detail entry with the accepted record, then invalidate the event-list prefix.
- **B.** Change only the visible card text and leave cached list totals untouched.
- **C.** Invalidate only the detail key and assume every list updates automatically.
- **D.** Clear all React state and reload the entire document after every save.

## 5. An optimistic publication changes a cached event from draft to published. The server rejects it. What must the recovery path accomplish?

- **A.** Hide the error because the optimistic badge already changed.
- **B.** Restore the previously captured record to the affected entry and keep useful failure feedback.
- **C.** Keep the predicted record and retry forever.
- **D.** Mutate the snapshot object in place before restoring it.

## 6. The loader and EventDetail use the same client and eventOptions key. The title form already uses a mutation that updates detail data and invalidates lists. What should the routed screen do?

- **A.** Copy the loader result into a new useState owner, then keep both copies synchronized manually.
- **B.** Create a new QueryClient each time the detail component renders.
- **C.** Add a route action that submits the same title PATCH again after the mutation.
- **D.** Subscribe through useQuery to the existing entry and retain the existing mutation-owned write path.

