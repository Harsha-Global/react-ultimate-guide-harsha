import { createBrowserRouter } from "react-router";
import {
  employeesLoader,
  employeeLoader,
  shouldRevalidateEmployees,
} from "./routeData";
import RouteError from "./RouteError";
import InitialPending from "./InitialPending";
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
    ErrorBoundary: RouteError,
    HydrateFallback: InitialPending,
    children: [
      { index: true, Component: Home },
      {
        path: "employees",
        Component: EmployeeList,
        loader: employeesLoader,
        shouldRevalidate: shouldRevalidateEmployees,
        ErrorBoundary: RouteError,
      },
      {
        path: "employees/:employeeId",
        Component: EmployeeDetail,
        loader: employeeLoader,
        ErrorBoundary: RouteError,
      },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);
