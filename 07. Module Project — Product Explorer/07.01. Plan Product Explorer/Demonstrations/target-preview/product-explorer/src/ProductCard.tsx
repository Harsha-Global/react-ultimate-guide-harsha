import type { Product } from "./types";

type ProductCardProps = { readonly product: Product; readonly isSelected: boolean; readonly onSelect: (id: string) => void };

export default function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <article className={isSelected ? "product-card selected" : "product-card"}>
      <img src={product.image} alt="" width="240" height="240" />
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="price">${product.price.toLocaleString("en-US")}</p>
      <p className={product.inStock ? "in-stock" : "out-of-stock"}>
        {product.inStock ? "In stock" : "Out of stock"}
      </p>
      <button type="button" aria-pressed={isSelected} onClick={() => onSelect(product.id)}>View {product.name}</button>
    </article>
  );
}
