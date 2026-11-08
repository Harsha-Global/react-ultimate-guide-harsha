type Props = {
  query: {
    data: unknown;
    error: Error | null;
    isFetching: boolean;
    refetch: () => Promise<unknown>;
  };
};
export function QueryFeedback({ query }: { query: Props["query"] }) {
  if (query.error)
    return (
      <section className="notice" role="alert">
        <p>
          {query.data
            ? "The latest refresh failed. Earlier details are still shown."
            : "The products could not be loaded."}
        </p>
        <button className="secondary" type="button" disabled={query.isFetching} onClick={() => void query.refetch()}>
          Try again
        </button>
      </section>
    );
  return query.isFetching ? (
    <p role="status" className="muted">
      {query.data ? "Refreshing product details…" : "Loading products…"}
    </p>
  ) : null;
}
