import { useGetReadyOrdersQuery } from "./services/readinessApi";
import { errorMessage } from "./services/contracts";
export function ReadinessSummary() {
  const query = useGetReadyOrdersQuery();
  return (
    <section className="checklist" aria-label="Packing readiness">
      <h2>Packing readiness</h2>
      {query.isLoading ? (
        <p role="status">Checking readiness…</p>
      ) : query.currentData ? (
        <p>
          {query.currentData.length}{" "}
          {query.currentData.length === 1 ? "order" : "orders"} ready to pack
        </p>
      ) : null}
      {query.isFetching && !query.isLoading && (
        <p role="status">Updating readiness…</p>
      )}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      <button className="secondary" onClick={() => query.refetch()}>
        Refresh readiness
      </button>
    </section>
  );
}
