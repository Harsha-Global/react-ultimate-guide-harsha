import { isCity, isSeating } from "./customer";
import type { CustomerDraft } from "./customer";

export function readCustomerForm(data: FormData): CustomerDraft | null {
  const fullName = data.get("fullName");
  const email = data.get("email");
  const city = data.get("city");
  const arrivalMinutes = data.get("arrivalMinutes");
  const note = data.get("note");
  const seating = data.get("seating");
  const updates = data.get("updates");
  if (typeof fullName !== "string" || typeof email !== "string" ||
      typeof city !== "string" || !isCity(city) ||
      typeof arrivalMinutes !== "string" || typeof note !== "string" ||
      typeof seating !== "string" || !isSeating(seating) ||
      (updates !== null && updates !== "yes")) return null;
  return { fullName, email, city, arrivalMinutes, note, seating, updates: updates === "yes" };
}
