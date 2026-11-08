import axios from "axios";
import { normalizeRequestError } from "./requestErrors";
export const apiClient = axios.create({ baseURL: "/api", timeout: 5000 });
// One instance owns one set of policies; components do not register these on render.
const requestInterceptor = apiClient.interceptors.request.use((config) => {
  config.headers.set("X-Request-Id", crypto.randomUUID());
  return config;
});
const responseInterceptor = apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(normalizeRequestError(error)),
);
// Vite replaces this module during development. Remove its old registrations.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    apiClient.interceptors.request.eject(requestInterceptor);
    apiClient.interceptors.response.eject(responseInterceptor);
  });
}
