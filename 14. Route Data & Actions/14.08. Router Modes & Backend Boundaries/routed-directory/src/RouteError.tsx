import {
  isRouteErrorResponse,
  Link,
  useRevalidator,
  useRouteError,
} from "react-router";
export default function RouteError() {
  const error: unknown = useRouteError();
  const revalidator = useRevalidator();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return (
    <section className="panel">
      <title>{`${missing ? "Not found" : "Request failed"} | Team Directory`}</title>
      <h1 tabIndex={-1}>
        {missing ? "Employee not found" : "Could not load this page"}
      </h1>
      <p role="alert">
        {missing
          ? "Check the address or choose another employee."
          : "Check that the local API is running, then try again."}
      </p>
      {!missing && (
        <button
          disabled={revalidator.state !== "idle"}
          onClick={() => {
            void revalidator.revalidate();
          }}
        >
          {revalidator.state === "idle" ? "Try again" : "Trying again…"}
        </button>
      )}
      <p>
        <Link className="button-link button-secondary" to="/employees">
          Go to employees
        </Link>
      </p>
    </section>
  );
}
