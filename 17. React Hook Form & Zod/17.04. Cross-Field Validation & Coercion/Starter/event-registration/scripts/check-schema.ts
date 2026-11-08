import { registrationSchema } from "../src/registration.ts";
// A boundary demonstration: payloads are unknown, as decoded request bodies are.
// This is not an HTTP server and creates no registration.
function receivePayload(payload: unknown) {
  const result = registrationSchema.safeParse(payload);
  if (!result.success) return { accepted: false, errors: result.error.issues };
  return { accepted: true, data: result.data };
}
console.log(
  "Valid payload:",
  receivePayload({ fullName: "  Alex Morgan  ", email: "ALEX@EXAMPLE.COM" }),
);
console.log(
  "Invalid payload:",
  receivePayload({ fullName: 42, email: "not-an-email" }),
);
