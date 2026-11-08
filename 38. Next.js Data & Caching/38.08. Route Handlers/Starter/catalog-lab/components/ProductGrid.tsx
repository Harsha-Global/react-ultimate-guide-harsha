import { formatPrice, type Product } from '@/lib/catalog';
export function ProductGrid({ products }: { products: Product[] }) {
 return <div className="grid">{products.map(product => <article className="card" key={product.id}><img src={product.image} alt="" width={400} height={300}/><div className="card-body"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p>{formatPrice(product.priceMinor)}</p><p className="stock">{product.stock ? `${product.stock} available` : 'Currently unavailable'}</p></div></article>)}</div>;
}
