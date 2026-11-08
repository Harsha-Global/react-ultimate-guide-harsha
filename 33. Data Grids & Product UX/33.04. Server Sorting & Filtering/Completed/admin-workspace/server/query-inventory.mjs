const sortFields = new Set(["name", "category", "priceMinor", "stock"]);
export function queryInventory(inventory, params) {
  const query = (params.get("q") ?? "").trim().toLowerCase();
  const sort = params.get("sort") ?? "";
  const direction = params.get("dir") ?? "asc";
  if (query.length > 60 || (sort && !sortFields.has(sort)) || !["asc", "desc"].includes(direction)) {
    throw new Error("Invalid catalog query.");
  }
  const items = inventory.filter((product) => product.name.toLowerCase().includes(query));
  if (sort) items.sort((left, right) => {
    const a = left[sort], b = right[sort];
    const order = typeof a === "number" ? a - b : a.toLowerCase().localeCompare(b.toLowerCase(), "en");
    return (direction === "desc" ? -order : order) || left.id.localeCompare(right.id);
  });
  return { items, total: items.length, summary: {
    all: inventory.length,
    low: inventory.filter((product) => product.stock > 0 && product.stock < 5).length,
    unavailable: inventory.filter((product) => product.stock === 0).length,
  } };
}
