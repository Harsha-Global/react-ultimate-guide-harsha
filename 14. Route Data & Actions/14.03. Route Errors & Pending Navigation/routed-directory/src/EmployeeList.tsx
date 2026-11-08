import { useLoaderData } from "react-router";
import type { employeesLoader } from "./routeData";
import EmployeeResults from "./EmployeeResults";
import QuickFind from "./QuickFind";

export default function EmployeeList() {
  const employees = useLoaderData<typeof employeesLoader>();
  return (
    <section className="panel">
      <title>Employees | Team Directory</title>
      <meta name="description" content="Browse and filter sample employees." />
      <h1 tabIndex={-1}>Employees</h1>
      <QuickFind />
      <EmployeeResults employees={employees} />
    </section>
  );
}
