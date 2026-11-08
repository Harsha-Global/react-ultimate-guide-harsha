const sortFields = new Set(["name", "category", "priceMinor", "stock"]);
export function queryInventory(inventory, params) {
  const availability = params.get("availability") ?? "all";
  if (!["all", "available", "low", "unavailable"].includes(availability)) throw new Error("Invalid availability.");
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const sort = params.get("sort") ?? "";
  const direction = params.get("dir") ?? "asc";
  if (query.length > 60 || (sort && !sortFields.has(sort)) || !["asc", "desc"].includes(direction)) {
    throw new Error("Invalid catalog query.");
  }
  const items = inventory.filter((product) => product.name.toLowerCase().includes(query) && (availability === "all" || (availability === "available" && product.stock > 0) || (availability === "low" && product.stock > 0 && product.stock < 5) || (availability === "unavailable" && product.stock === 0)));
  if (sort) items.sort((left, right) => {
    const a = left[sort], b = right[sort];
    const order = typeof a === "number" ? a - b : a.toLowerCase().localeCompare(b.toLowerCase(), "en");
    return (direction === "desc" ? -order : order) || left.id.localeCompare(right.id);
  });
  const pageText = params.get("page") ?? "1";
  const sizeText = params.get("pageSize") ?? "50";
  const page = Number(pageText), pageSize = Number(sizeText);
  if (!/^[1-9]\d*$/.test(pageText) || !Number.isSafeInteger(page) || page > 100000 || !["2", "4", "50"].includes(sizeText)) throw new Error("Invalid page.");
  const total = items.length;
  const pageItems = items.slice((page - 1) * pageSize, page * pageSize);
  return { items: pageItems, total, summary: {
    all: inventory.length,
    low: inventory.filter((product) => product.stock > 0 && product.stock < 5).length,
    unavailable: inventory.filter((product) => product.stock === 0).length,
  } };
}
