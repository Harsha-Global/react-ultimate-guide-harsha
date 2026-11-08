import { Link } from "react-router";
export default function NotFound() {
  return (
    <section className="panel">
      <title>Page not found | Team Directory</title>
      <meta name="description" content="The requested page is unavailable." />
      <h1 tabIndex={-1}>Page not found</h1>
      <p>That address does not match a directory page.</p>
      <Link className="button-link button-primary" to="/employees">
        Go to employees
      </Link>
    </section>
  );
}
