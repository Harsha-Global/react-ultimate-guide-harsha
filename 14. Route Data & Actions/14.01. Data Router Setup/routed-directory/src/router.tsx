import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Home";
import EmployeeList from "./EmployeeList";
import EmployeeDetail from "./EmployeeDetail";
import About from "./About";
import NotFound from "./NotFound";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "employees", Component: EmployeeList },
      { path: "employees/:employeeId", Component: EmployeeDetail },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);
