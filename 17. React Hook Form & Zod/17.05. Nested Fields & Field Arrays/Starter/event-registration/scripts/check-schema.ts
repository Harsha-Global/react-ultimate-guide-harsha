import { registrationSchema } from "../src/registration.ts";
const valid = {
  fullName: " Alex Morgan ",
  email: "ALEX@EXAMPLE.COM",
  ticketCount: "2",
  attendance: "in-person",
  city: "Denver",
  acceptTerms: true,
};
for (const [name, payload] of Object.entries({
  valid,
  empty: { ...valid, ticketCount: "" },
  fractional: { ...valid, ticketCount: "1.5" },
  missingCity: { ...valid, city: "" },
  online: { ...valid, attendance: "online", city: "" },
  unchecked: { ...valid, acceptTerms: false },
})) {
  const result = registrationSchema.safeParse(payload);
  console.log(name, result.success ? result.data : result.error.issues);
}
console.log("Boolean coercion of the string false:", Boolean("false"));
