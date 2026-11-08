import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home, AuthScreen, NotFound } from "./PublicPages";
import { AccountPage } from "./AccountPage";
import { RequireSession, RequireAdmin } from "./Guards";
import { AdminPage } from "./AdminPage";
export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "login", element: <AuthScreen mode="login" /> },
      { path: "register", element: <AuthScreen mode="register" /> },
      {
        Component: RequireSession,
        children: [
          { path: "account", Component: AccountPage },
          {
            Component: RequireAdmin,
            children: [{ path: "admin", Component: AdminPage }],
          },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
