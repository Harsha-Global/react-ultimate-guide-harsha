import { Link } from "react-router";
export default function Home() {
    return (
        <section className="panel">
            <title>Team Directory</title>
            <meta
              name="description"
              content="Find your teammates in the local directory."
            />
            <h1 tabIndex={-1}>Team Directory</h1>
            <p>A place to find your teammates.</p>
            <Link className="button-link button-primary" to="/employees">
                Browse employees
            </Link>
        </section>
    );
}
