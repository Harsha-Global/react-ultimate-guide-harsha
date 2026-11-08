import type { Product } from "./types";
import ProductCard from "./ProductCard";

type ProductGridProps = { readonly favoriteIds: readonly string[]; readonly onToggleFavorite: (id: string) => void; readonly products: readonly Product[]; readonly selectedId: string | null; readonly onSelect: (id: string) => void };

export default function ProductGrid({ favoriteIds, onToggleFavorite, products, selectedId, onSelect }: ProductGridProps) {
  if (products.length === 0) return <p role="status">No products match your filters.</p>;
  return <ul className="product-grid">{products.map(product => (
    <li key={product.id}><ProductCard product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={onToggleFavorite} isSelected={product.id === selectedId} onSelect={onSelect} /></li>
  ))}</ul>;
}
