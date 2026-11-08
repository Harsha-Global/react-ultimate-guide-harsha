type ProductFiltersProps = {
  readonly query: string;
  readonly category: string;
  readonly onQueryChange: (query: string) => void;
  readonly onCategoryChange: (category: string) => void;
};

export default function ProductFilters({ query, category, onQueryChange, onCategoryChange }: ProductFiltersProps) {
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
    </section>
  );
}
