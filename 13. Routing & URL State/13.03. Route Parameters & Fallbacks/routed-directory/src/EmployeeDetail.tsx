import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getEmployee, HttpError } from "./employeeApi";
import type { Employee } from "./types";
export default function EmployeeDetail() {
    const { employeeId } = useParams<"employeeId">();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [status, setStatus] = useState<
        "loading" | "ready" | "missing" | "error"
    >("loading");
    useEffect(() => {
        if (!employeeId || !/^e\d+$/.test(employeeId)) {
            setStatus("missing");
            return;

        }
        const controller = new AbortController();
        let ignore = false;
        setEmployee(null);
        setStatus("loading");
        getEmployee(employeeId, controller.signal)
            .then((result) => {
                if (!ignore) {
                    setEmployee(result);
                    setStatus("ready");

                }
            })
            .catch((error: unknown) => {
                if (!ignore)
                    setStatus(
                        error instanceof HttpError && error.status === 404
                            ? "missing"
                            : "error",
                    );
            });
        return () => {
            ignore = true;
            controller.abort();

        };

    }, [employeeId]);
    return (
        <section className="panel">
            <h1>Employee details</h1>
            {status === "loading" && <p role="status">Loading details…</p>}
            {status === "missing" && <p role="alert">Employee not found.</p>}
            {status === "error" && (
                <p role="alert">Could not load details. Check the API and reload.</p>

            )}
            {status === "ready" && employee && (
                <>
                    <h2>{employee.name}</h2>
                    <dl>
                        <dt>Role</dt>
                        <dd>{employee.role}</dd>
                        <dt>Team</dt>
                        <dd>{employee.team}</dd>
                        <dt>Email</dt>
                        <dd>{employee.email}</dd>
                        <dt>Status</dt>
                        <dd>{employee.active ? "Active" : "Inactive"}</dd>
                    </dl>
                </>

            )}
            <Link className="button-link button-primary" to="/employees">
                Back to employees
            </Link>
        </section>

    );

}