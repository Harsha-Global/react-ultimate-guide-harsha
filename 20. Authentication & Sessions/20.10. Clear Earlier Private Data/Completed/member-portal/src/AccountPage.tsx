import { useQuery } from "@tanstack/react-query";
import { getAccount } from "./api";
import { privateKeys } from "./queryClient";
import { useAuth } from "./Auth";
export function AccountPage() {
  const auth = useAuth();
  if (auth.state.status !== "authenticated") return null;
  return (
    <AccountDetails key={auth.state.user.id} userId={auth.state.user.id} name={auth.state.user.name} />
  );
}
function AccountDetails({ userId, name }: { userId: string; name: string }) {
  const query = useQuery({
    queryKey: privateKeys.account(userId),
    queryFn: ({ signal }) => getAccount(userId, signal),
  });

  return (
    <>
      <p className="eyebrow">Your membership</p>
      <h1>
        A little more you,
        <br />
        {name.split(" ")[0]}.
      </h1>
      <p className="lead">Your saved plans, all in one familiar place.</p>
      <div className="dashboard">
        <section className="card">
          <h2>On your calendar</h2>
          {query.isPending && <p role="status">Loading your saved plans…</p>}
          {query.error && (
            <div className="notice" role="alert">
              <p>{query.error.message}</p>
              <button className="secondary" disabled={query.isFetching} onClick={() => void query.refetch()}>
                Try again
              </button>
            </div>
          )}
          {query.data && (
            <>
              <p className="muted">Member since {query.data.memberSince}</p>
              <ul className="events">
                {query.data.savedEvents.map((event) => (
                  <li key={event.id}>
                    <span className="event-icon" aria-hidden="true">
                      ✦
                    </span>
                    <div className="copy">
                      <h3>{event.title}</h3>
                      <p className="muted">A Cedar Club gathering</p>
                    </div>
                    <time>{event.date}</time>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button className="secondary" disabled={query.isFetching} onClick={() => void query.refetch()}>
            {query.isFetching ? "Refreshing…" : "Refresh saved plans"}
          </button>
        </section>
        <aside className="card">
          <span className="status-pill">A place to belong</span>
          <h2>
            Make room
            <br />
            for good company.
          </h2>
          <p className="muted">
            Small gatherings. Familiar faces. Something worth looking forward
            to.
          </p>
          <div className="art" aria-hidden="true">
            <span className="sun" />
            <span className="hill back" />
            <span className="hill" />
            <span className="quote">See you there.</span>
          </div>
        </aside>
      </div>
    </>
  );
}
