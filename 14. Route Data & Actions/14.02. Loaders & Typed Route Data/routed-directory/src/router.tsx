import { createBrowserRouter } from "react-router";
import {
  employeesLoader,
  employeeLoader,
  shouldRevalidateEmployees,
} from "./routeData";
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
      {
        path: "employees",
        Component: EmployeeList,
        loader: employeesLoader,
        shouldRevalidate: shouldRevalidateEmployees,
            },
      {
        path: "employees/:employeeId",
        Component: EmployeeDetail,
        loader: employeeLoader,
            },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);
