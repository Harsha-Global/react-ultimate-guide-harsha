import { useQuery } from "@tanstack/react-query";
import { getAdminSummary, ApiError } from "./api";
import { privateKeys } from "./queryClient";
import { useAuth } from "./Auth";
import { Forbidden } from "./Guards";
export function AdminPage() {
  const auth = useAuth();
  if (auth.state.status !== "authenticated") return null;
  return <AdminDetails key={auth.state.user.id} userId={auth.state.user.id} />;
}
function AdminDetails({ userId }: { userId: string }) {
  const auth = useAuth();
  async function readAdmin(signal: AbortSignal) {
    const captured = auth.getVersion();
    try {
      return await getAdminSummary(signal);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401)
        auth.expireIfCurrent(captured);
      throw error;
    }
  }
  const query = useQuery({
    queryKey: privateKeys.admin(userId),
    queryFn: ({ signal }) => readAdmin(signal),
  });
  if (query.error instanceof ApiError && query.error.status === 403)
    return <Forbidden />;
  return (
    <>
      <p className="eyebrow">Cedar Club staff</p>
      <h1>Care for your community.</h1>
      <p className="lead">
        A small overview for the people behind the gatherings.
      </p>
      <section className="card">
        <h2>Membership overview</h2>
        {query.isPending && <p role="status">Loading the staff overview…</p>}
        {query.error && (
          <div className="notice" role="alert">
            <p>{query.error.message}</p>
            <button disabled={query.isFetching} onClick={() => void query.refetch()}>
              Try again
            </button>
          </div>
        )}
        {query.data && (
          <div className="numbers">
            <div>
              <div className="number">{query.data.members}</div>
              <p>Practice members</p>
            </div>
            <div>
              <div className="number">{query.data.activeSessions}</div>
              <p>Active signed-in sessions</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
