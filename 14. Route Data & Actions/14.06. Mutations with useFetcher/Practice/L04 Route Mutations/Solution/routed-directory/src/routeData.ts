import type {
  LoaderFunctionArgs,
  ShouldRevalidateFunctionArgs,
} from "react-router";
import { getEmployee, HttpError, listEmployees } from "./employeeApi";
export function requireEmployeeId(value: string | undefined) {
  if (!value || !/^e\d+$/.test(value))
    throw new Response("Employee not found.", { status: 404 });
  return value;
}
export function shouldRevalidateEmployees({
  currentUrl,
  nextUrl,
  formMethod,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (
    !formMethod &&
    currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search !== nextUrl.search
  )
    return false;
  return defaultShouldRevalidate;
}
export async function employeesLoader({ request }: LoaderFunctionArgs) {
  return listEmployees(request.signal);
}
export async function employeeLoader({ params, request }: LoaderFunctionArgs) {
  const id = requireEmployeeId(params.employeeId);
  try {
    return await getEmployee(id, request.signal);
  } catch (error: unknown) {
    if (error instanceof HttpError && error.status === 404)
      throw new Response("Employee not found.", { status: 404 });
    throw error;
  }
}
