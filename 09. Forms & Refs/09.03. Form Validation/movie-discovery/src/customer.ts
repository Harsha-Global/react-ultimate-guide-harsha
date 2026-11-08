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

export function createCustomerDraft(): CustomerDraft {
  return { fullName: "", email: "", city: "Seattle", arrivalMinutes: "15",
    note: "", updates: false, seating: "aisle" };
}

export function isCity(value: string): value is City {
  return value === "Seattle" || value === "Boston";
}

export function isSeating(value: string): value is Seating {
  return value === "aisle" || value === "center";
}
