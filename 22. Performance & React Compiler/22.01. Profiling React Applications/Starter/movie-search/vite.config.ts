import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias:
      mode === "profiling" ? { "react-dom/client": "react-dom/profiling" } : {},
  },
  server: { host: "127.0.0.1", port: 5250, strictPort: true },
  preview: { host: "127.0.0.1", port: 5250, strictPort: true },
}));
