type Product = { readonly id: string; readonly name: string; readonly price: number };
type ProductCardProps = { readonly name: string; readonly price: number };
type ProductListProps = { products: readonly Product[] };

export function ProductCard({ name, price }: ProductCardProps) {
  // Build the required heading and price paragraph here.
  return <article><p>{name}: {price}</p></article>;
}

export function ProductList({ products }: ProductListProps) {
  // Handle the empty case, then map products to keyed list items.
  return <p>{products.length} products to implement</p>;
}

const products = [
  { id: 'p1', name: 'Travel Backpack', price: 25 },
  { id: 'p2', name: 'Desk Lamp', price: 18 },
];

export default function App() {
  return <main><h1>Products</h1><ProductList products={products} /></main>;
}
