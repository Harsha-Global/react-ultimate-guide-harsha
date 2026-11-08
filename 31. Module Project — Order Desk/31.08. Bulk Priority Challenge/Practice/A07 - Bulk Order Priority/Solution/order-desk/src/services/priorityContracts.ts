import { isOrder } from "./contracts";
import type { ApiOrder } from "./contracts";
export type PriorityRequest = {
  items: { id: string; version: number }[];
  priority: "normal" | "high";
};
export type PriorityResult =
  | { id: string; ok: true; order: ApiOrder }
  | { id: string; ok: false; code: 404 | 409 | 422; message: string };
export function readPriorityResults(
  value: unknown,
  request: PriorityRequest,
): PriorityResult[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("results" in value) ||
    !Array.isArray(value.results)
  )
    throw Error("Unexpected priority result.");
  const results: PriorityResult[] = [];
  const expected = new Set(request.items.map((item) => item.id));
  for (const row of value.results) {
    if (
      !row ||
      typeof row !== "object" ||
      typeof row.id !== "string" ||
      !expected.delete(row.id)
    )
      throw Error("Unexpected priority result.");
    if (row.ok === true && isOrder(row.order) && row.order.id === row.id)
      results.push({ id: row.id, ok: true, order: row.order });
    else if (
      row.ok === false &&
      [404, 409, 422].includes(row.code) &&
      typeof row.message === "string"
    )
      results.push({
        id: row.id,
        ok: false,
        code: row.code,
        message: row.message,
      });
    else throw Error("Unexpected priority result.");
  }
  if (expected.size) throw Error("Missing priority result.");
  return results;
}
