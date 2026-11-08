export type Employee = Readonly<{
  id: string;
  name: string;
  role: string;
  team: string;
  email: string;
  active: boolean;
}>;
export type EmployeeInput = Omit<Employee, "id">;
