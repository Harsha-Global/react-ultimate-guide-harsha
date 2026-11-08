# Explained answer

For the original brief, App owns query, category, and selectedId because the filter controls, result grid, and details share those choices. Products remain the source collection. visibleProducts follows from products, query, and category; selectedProduct follows from products and selectedId. Deriving these values avoids keeping duplicate state in sync. Card-only visual markup does not need extra state.

The selection lookup uses the full product collection. Filtering changes which cards appear, not which product the customer selected. Derive a separate visibility check for the outside-filters notice.

Revisit Callbacks & Lifting State and Inputs & Derived Values if this distinction is unclear. Plan only the original search/category design here; later client requests are handled when they arrive.
