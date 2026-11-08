import { formatPrice, type Product } from '@/lib/catalog';
export function ProductDetails({product}:{product:Product}) {
 return <article className="detail"><img src={product.image} alt={product.name} width={800} height={800}/><div><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p>{formatPrice(product.priceMinor)}</p><p>{product.stock ? `${product.stock} available` : 'Currently unavailable'}</p></div></article>;
}
