import { isRouteErrorResponse, Link, useRevalidator, useRouteError } from "react-router";
export default function RouteError() {
  const error = useRouteError();
  const revalidator = useRevalidator();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return (
    <section className="empty-state" role="alert">
      <p className="eyebrow">A little interruption</p>
      <h1 tabIndex={-1}>
        {missing ? "Product not found" : "We couldn't load this page"}
      </h1>
      <p>
        {missing
          ? "It may have been removed from the collection."
          : "Check that the local API is running, then try again."}
      </p>
      <div className="actions">
        {!missing && (
          <button disabled={revalidator.state !== "idle"} onClick={() => revalidator.revalidate()}>
            {revalidator.state !== "idle" ? "Trying again…" : "Try again"}
          </button>
        )}
        <Link className="button secondary" to="/">
          Back to collection
        </Link>
      </div>
    </section>
  );
}
