import type { Product } from "./types";
import ProductCard from "./ProductCard";

type ProductGridProps = { readonly products: readonly Product[]; readonly selectedId: string | null; readonly onSelect: (id: string) => void };

export default function ProductGrid({ products, selectedId, onSelect }: ProductGridProps) {
  if (products.length === 0) return <p role="status">No products match your filters.</p>;
  return <ul className="product-grid">{products.map(product => (
    <li key={product.id}><ProductCard product={product} isSelected={product.id === selectedId} onSelect={onSelect} /></li>
  ))}</ul>;
}
