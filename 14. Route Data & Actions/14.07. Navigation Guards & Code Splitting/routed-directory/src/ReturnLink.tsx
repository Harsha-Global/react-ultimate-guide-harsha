import { Link, useLocation } from "react-router";

export default function ReturnLink() {
  const location = useLocation();
  const state: unknown = location.state;
  let destination = "/employees";
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string" &&
    (state.from === "/employees" || state.from.startsWith("/employees?"))
  )
    destination = state.from;
  return (
    <Link className="button-link button-secondary" to={destination}>
      Back to employees
    </Link>
  );
}
