import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({
      presets: [
        reactCompilerPreset({
          logger: {
            logEvent(filename, event) {
              console.log(`[React Compiler] ${event.kind}: ${filename}`);
              if (event.kind === "CompileError")
                console.warn(event.detail.reason);
            },
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias:
      mode === "profiling" ? { "react-dom/client": "react-dom/profiling" } : {},
  },
  server: { host: "127.0.0.1", port: 5250, strictPort: true },
  preview: { host: "127.0.0.1", port: 5250, strictPort: true },
}));
