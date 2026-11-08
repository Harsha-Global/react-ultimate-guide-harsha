type Product = { readonly id: string; readonly name: string; readonly price: number };
type ProductCardProps = { readonly name: string; readonly price: number };
type ProductListProps = { products: readonly Product[] };

export function ProductCard({ name, price }: ProductCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>Price: ${price}</p>
    </article>
  );
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard name={product.name} price={product.price} />
        </li>
      ))}
    </ul>
  );
}

const products = [
  { id: 'p1', name: 'Travel Backpack', price: 25 },
  { id: 'p2', name: 'Desk Lamp', price: 18 },
];

export default function App() {
  return <main><h1>Products</h1><ProductList products={products} /></main>;
}
