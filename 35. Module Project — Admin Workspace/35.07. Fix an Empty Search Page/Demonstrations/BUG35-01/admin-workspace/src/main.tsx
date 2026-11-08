import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v8";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import App from "./App";
import { PreferenceBoundary, restorePreferences } from "./components/PreferenceBoundary";
import "./index.css";

createRoot(document.getElementById("root")!).render(<StrictMode><BrowserRouter><NuqsAdapter><QueryClientProvider client={queryClient}><PreferenceBoundary><App /></PreferenceBoundary></QueryClientProvider></NuqsAdapter></BrowserRouter></StrictMode>);

void restorePreferences();
