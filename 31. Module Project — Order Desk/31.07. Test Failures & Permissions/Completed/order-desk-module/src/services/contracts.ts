import type { Order } from "../orders";
export type ApiOrder = Order & { version: number };
export type LiveOrders = {
  items: ApiOrder[];
  connection: "connecting" | "live" | "closed";
};
export type StatusFilter = "all" | Order["status"];
export type PageArgument = {
  search: string;
  page: number;
  status?: StatusFilter;
};
export type OrderPage = {
  items: ApiOrder[];
  page: number;
  nextPage: number | null;
  total: number;
};
export function isOrder(value: unknown): value is ApiOrder {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.customer === "string" &&
    typeof o.item === "string" &&
    Number.isInteger(o.units) &&
    typeof o.total === "number" &&
    Number.isFinite(o.total) &&
    typeof o.status === "string" &&
    ["ready", "payment-pending", "shipped"].includes(o.status) &&
    Number.isInteger(o.version) &&
    Number(o.version) > 0
  );
}
export function readOrder(value: unknown): ApiOrder {
  if (!isOrder(value)) throw Error("Unexpected order response.");
  return value;
}
export function readOrders(value: unknown): ApiOrder[] {
  if (!Array.isArray(value) || !value.every(isOrder))
    throw Error("Unexpected queue response.");
  return value;
}
export function readPage(value: unknown): OrderPage {
  if (!value || typeof value !== "object")
    throw Error("Unexpected page response.");
  const p = value as Record<string, unknown>;
  if (
    !Number.isInteger(p.page) ||
    Number(p.page) < 1 ||
    !Number.isInteger(p.total) ||
    Number(p.total) < 0 ||
    !(
      p.nextPage === null ||
      (Number.isInteger(p.nextPage) && Number(p.nextPage) > Number(p.page))
    )
  )
    throw Error("Unexpected page response.");
  return {
    items: readOrders(p.items),
    page: Number(p.page),
    nextPage: p.nextPage as number | null,
    total: Number(p.total),
  };
}
export function errorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    )
      return data.message;
  }
  return "The order service is unavailable. Retry the request.";
}
