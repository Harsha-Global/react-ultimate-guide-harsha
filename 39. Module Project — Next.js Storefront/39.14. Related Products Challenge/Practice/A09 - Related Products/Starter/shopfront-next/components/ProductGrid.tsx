import { ShortlistButton } from './ShortlistButton';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, type Product } from '@/lib/catalog';
export function ProductGrid({ products }: { products: Product[] }) {
 return <div className="grid">{products.map(product => <article className="card" key={product.id}><Image src={product.image} alt="" width={400} height={300} sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 25vw"/><div className="card-body"><span className="eyebrow">{product.category}</span><h2><Link id={`product-${product.slug}`} href={`/products/${product.slug}`}>{product.name}</Link></h2><p>{formatPrice(product.priceMinor)}</p><p className="stock">{product.stock ? `${product.stock} available` : 'Currently unavailable'}</p><ShortlistButton id={product.id} name={product.name}/></div></article>)}</div>;
}
