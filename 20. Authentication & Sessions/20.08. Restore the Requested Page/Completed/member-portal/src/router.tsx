import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home, AuthScreen, NotFound } from "./PublicPages";
import { AccountPage } from "./AccountPage";
import { RequireSession } from "./Guards";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "login", element: <AuthScreen mode="login" /> },
      { path: "register", element: <AuthScreen mode="register" /> },
      {
        Component: RequireSession,
        children: [{ path: "account", Component: AccountPage }],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
