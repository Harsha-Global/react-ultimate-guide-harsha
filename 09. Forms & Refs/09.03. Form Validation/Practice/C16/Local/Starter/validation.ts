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

export function validateCustomer(_draft: CustomerDraft): FieldErrors {
  // Implement the rules in Task.md without changing the input.
  return {};
}
export function hasErrors(errors: FieldErrors): boolean { return Object.keys(errors).length > 0; }
