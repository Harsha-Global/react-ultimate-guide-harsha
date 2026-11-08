import { useGetOrdersQuery } from "./services/ordersApi";
export function ApiConnection() {
  const query = useGetOrdersQuery("");
  return (
    <section className="queue">
      <h2>Service connection</h2>
      {query.isLoading ? (
        <p role="status">Checking the order service…</p>
      ) : query.isError ? (
        <p role="alert">Start the API and retry.</p>
      ) : (
        <p>{query.data?.length} orders received from the API.</p>
      )}
      <button className="secondary" onClick={() => query.refetch()}>
        Check connection
      </button>
    </section>
  );
}
