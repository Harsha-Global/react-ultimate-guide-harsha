type SessionUser = { id: string; role: "member" | "admin" };
function inventoryStatus(user: SessionUser | null, requestBody: unknown): 200 | 401 | 403 {
  // TODO: decide from the authenticated server context only.
  return 200;
}
