type ProductFiltersProps = {
  readonly favoritesOnly: boolean;
  readonly onFavoritesOnlyChange: (value: boolean) => void;
  readonly query: string;
  readonly category: string;
  readonly inStockOnly: boolean;
  readonly onQueryChange: (query: string) => void;
  readonly onCategoryChange: (category: string) => void;
  readonly onInStockChange: (inStockOnly: boolean) => void;
};

export default function ProductFilters({ favoritesOnly, onFavoritesOnlyChange, query, category, inStockOnly, onQueryChange, onCategoryChange, onInStockChange }: ProductFiltersProps) {
  return (
    <section className="filters" aria-label="Product filters">
      <label htmlFor="search">Search products
        <input id="search" type="search" value={query} onChange={event => onQueryChange(event.currentTarget.value)} />
      </label>
      <label htmlFor="category">Category
        <select id="category" value={category} onChange={event => onCategoryChange(event.currentTarget.value)}>
          <option value="all">All categories</option><option value="Travel">Travel</option>
          <option value="Home">Home</option><option value="Audio">Audio</option>
        </select>
      </label>
      <label className="check"><input type="checkbox" checked={inStockOnly}
        onChange={event => onInStockChange(event.currentTarget.checked)} /> In stock only</label>
      <label className="check"><input type="checkbox" checked={favoritesOnly}
        onChange={event => onFavoritesOnlyChange(event.currentTarget.checked)} /> Favorites only</label>
    </section>
  );
}
