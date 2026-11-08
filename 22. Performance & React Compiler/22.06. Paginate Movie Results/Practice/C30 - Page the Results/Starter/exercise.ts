type Page<T> = { items: T[]; page: number; totalPages: number };
function pageResults<T>(items: readonly T[], requestedPage: number, pageSize: number): Page<T> {
  // TODO: calculate the page count, clamp the page and return its slice.
  return { items: [...items], page: 1, totalPages: 1 };
}
