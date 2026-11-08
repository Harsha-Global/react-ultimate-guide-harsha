import { Link } from "react-router";
export default function Home() {
    return (
        <section className="panel">
            <h1>Team Directory</h1>
            <p>A place to find your teammates.</p>
            <Link className="button-link button-primary" to="/employees">
                Browse employees
            </Link>
        </section>
    );
}
