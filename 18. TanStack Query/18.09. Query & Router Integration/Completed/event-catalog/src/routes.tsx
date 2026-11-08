import { createBrowserRouter, Link, redirect, useLocation, useParams, useRevalidator, useRouteError, isRouteErrorResponse } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { queryClient } from "./queryClient.ts";
import { eventOptions } from "./queries.ts";
import App from "./App.tsx";
import { Catalog } from "./Catalog.tsx";
import { EventDetail } from "./EventDetail.tsx";
export async function eventLoader({ params }: LoaderFunctionArgs) {
  const id = params.eventId;
  if (!id) throw new Response("Workshop not found", { status: 404 });
  await queryClient.query(eventOptions(id));
  return null;
}
function EventRoute() {
  const { eventId } = useParams();
  const { search } = useLocation();
  if (!eventId) throw new Error("This workshop address has no id.");
  return (
    <>
      <Link className="back-link" to={`/events${search}`}>
        Back to results
      </Link>
      <EventDetail key={eventId} id={eventId} />
    </>
  );
}
function RouteError() {
  const error = useRouteError();
  const revalidator = useRevalidator();
  const message = isRouteErrorResponse(error)
    ? "This workshop could not be opened."
    : error instanceof Error
      ? error.message
      : "Please try opening this workshop again.";
  return (
    <section className="error" role="alert">
      <h2>Could not open this workshop</h2>
      <p>{message}</p>
      <div className="actions">
        <button className="secondary" disabled={revalidator.state === "loading"} onClick={() => void revalidator.revalidate()}>
          {revalidator.state === "loading"
            ? "Trying again…"
            : "Try opening again"}
        </button>
        <Link className="secondary" to="/events">
          Browse workshops
        </Link>
      </div>
    </section>
  );
}
function About() {
  return (
    <section className="status">
      <h2>Make a little room.</h2>
      <p>
        Our weekend series brings creative people together in small groups
        across Denver.
      </p>
      <p>Choose a workshop, meet your neighbors, and try something new.</p>
    </section>
  );
}
function Opening() {
  return (
    <main className="page">
      <div className="brand">
        Event<em>Desk.</em>
      </div>
      <p className="status" role="status">
        Opening workshop…
      </p>
    </main>
  );
}
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Opening,
    children: [
      { index: true, loader: () => redirect("/events") },
      { path: "events", Component: Catalog },
      {
        path: "events/:eventId",
        loader: eventLoader,
        Component: EventRoute,
        ErrorBoundary: RouteError,
      },
      { path: "about", Component: About },
      {
        path: "*",
        element: (
          <section className="empty">
            <h2>Page not found</h2>
            <Link to="/events">Browse workshops</Link>
          </section>
        ),
      },
    ],
  },
]);
