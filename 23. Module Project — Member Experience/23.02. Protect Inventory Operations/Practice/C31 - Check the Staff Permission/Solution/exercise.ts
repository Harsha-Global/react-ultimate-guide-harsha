type SessionUser = { id: string; role: "member" | "admin" };
function inventoryStatus(user: SessionUser | null, requestBody: unknown): 200 | 401 | 403 {
  if (user === null) return 401;
  if (user.role !== "admin") return 403;
  return 200;
}
