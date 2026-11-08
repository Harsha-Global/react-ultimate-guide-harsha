import type { Product } from "./types";
import ProductCard from "./ProductCard";
import type { CartLine } from "./cart";

type ProductGridProps = { readonly products: readonly Product[]; readonly selectedId: string | null; readonly cart: readonly CartLine[]; readonly onSelect: (id: string) => void; readonly onAdd: (product: Product) => void };

export default function ProductGrid({ products, selectedId, cart, onSelect, onAdd }: ProductGridProps) {
  if (products.length === 0) return <p role="status">No products match your filters.</p>;
  return <ul className="product-grid">{products.map(product => (
    <li key={product.id}><ProductCard product={product} isSelected={product.id === selectedId}
      cartQuantity={cart.find(line => line.productId === product.id)?.quantity ?? 0}
      onSelect={onSelect} onAdd={onAdd} /></li>
  ))}</ul>;
}
