export type City = "Seattle" | "Boston";
export type Seating = "aisle" | "center";
export type CustomerDraft = Readonly<{
  fullName: string;
  email: string;
  city: City;
  arrivalMinutes: string;
  note: string;
  updates: boolean;
  seating: Seating;
}>;




export type FieldErrors = Readonly<{
  fullName?: string;
  email?: string;
  arrivalMinutes?: string;
  note?: string;
}>;

export function validateCustomer(draft: CustomerDraft): FieldErrors {
  const errors: { fullName?: string; email?: string; arrivalMinutes?: string; note?: string } = {};
  if (!draft.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = "Enter an email address such as emily@example.com.";
  }
  const minutes = Number(draft.arrivalMinutes);
  if (draft.arrivalMinutes.trim() === "" || !Number.isInteger(minutes) || minutes < 0 || minutes > 60) {
    errors.arrivalMinutes = "Enter a whole number from 0 to 60.";
  }
  if (draft.note.length > 200) errors.note = "Keep the note within 200 characters.";
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
