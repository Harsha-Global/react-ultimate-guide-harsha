import axios from "axios";

export class HttpError extends Error {
  readonly status: number;
  constructor(status: number) { super(`The server returned HTTP ${status}.`); this.status = status; }
}

export function normalizeRequestError(error: unknown): Error {
    if (axios.isCancel(error))
        return new DOMException("The request was cancelled.", "AbortError");
    if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
            return new Error("The request timed out. Try again.");
        }
        if (error.response) return new HttpError(error.response.status);
        if (error.request) return new TypeError("Cannot reach the local API.");
    }
    return error instanceof Error
    ? error
    : new Error("The request could not be completed.");
}
