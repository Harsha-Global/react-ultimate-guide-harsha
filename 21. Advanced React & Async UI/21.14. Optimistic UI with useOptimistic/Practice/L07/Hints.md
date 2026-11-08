# Hints — open after trying

1. Keep confirmed reviews as the first argument to useOptimistic. Pass a pure reducer that adds a pending draft without mutating the array.
2. Use clientId to recognize an already-confirmed record when React recalculates the preview over updated base data.
3. Call the optimistic setter inside submitReview, before awaiting the existing request. The form action already supplies the Action context.
4. Render the optimistic list. Check pending on each row for the label and appearance; do not add pending records to the confirmed list prematurely.
5. The request's success update already reconciles the base. On an expected rejection, leave that base unchanged and keep the error/draft behavior. The hook's preview lifetime then ends with the Action.
