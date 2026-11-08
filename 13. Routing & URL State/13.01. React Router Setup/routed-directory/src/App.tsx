import { Route, Routes } from "react-router";
import EmployeeList from "./EmployeeList";
import About from "./About";
export default function App() {
  return (
    <main className="shell">
      <p className="eyebrow">People & teams</p>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}
