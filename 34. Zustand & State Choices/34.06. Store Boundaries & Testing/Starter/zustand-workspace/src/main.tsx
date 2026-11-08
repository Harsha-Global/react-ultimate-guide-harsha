import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v8";
import App from "./App";
import { PreferenceBoundary, restorePreferences } from "./components/PreferenceBoundary";
import "./index.css";

createRoot(document.getElementById("root")!).render(<StrictMode><BrowserRouter><NuqsAdapter><PreferenceBoundary><App /></PreferenceBoundary></NuqsAdapter></BrowserRouter></StrictMode>);

void restorePreferences();
