import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./Home";

import EmployeeList from "./EmployeeList";
import EmployeeDetail from "./EmployeeDetail";
import NotFound from "./NotFound";

import About from "./About";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:employeeId" element={<EmployeeDetail />} />

        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}
