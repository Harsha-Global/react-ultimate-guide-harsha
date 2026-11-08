import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    cacheDir: ".vite-cache",
    plugins: [react()],
    preview: { host: "127.0.0.1", port: 5185, strictPort: true, proxy: { "/api": "http://127.0.0.1:4185", "/uploads": "http://127.0.0.1:4185" } },
    server: {
        host: "127.0.0.1",
        port: 5185,
        strictPort: true,
        proxy: {
            "/api": "http://127.0.0.1:4185",
            "/uploads": "http://127.0.0.1:4185",
        },
    },
});
