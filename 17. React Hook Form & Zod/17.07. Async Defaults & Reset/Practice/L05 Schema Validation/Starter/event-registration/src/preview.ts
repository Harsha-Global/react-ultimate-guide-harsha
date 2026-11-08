import type { RegistrationValues } from "./registration.ts";
// Local asynchronous demonstration. This does not call an API.
export async function preparePreview(
  values: RegistrationValues,
): Promise<RegistrationValues> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ...values };
}
