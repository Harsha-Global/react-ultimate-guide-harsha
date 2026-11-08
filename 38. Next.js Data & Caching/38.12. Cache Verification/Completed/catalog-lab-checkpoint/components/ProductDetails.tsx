import Image from 'next/image';
import { formatPrice, type Product } from '@/lib/catalog';
export function ProductDetails({product,featured=false}:{product:Product;featured?:boolean}) {
 return <article className="detail"><Image src={product.image} alt={product.name} width={800} height={800} sizes="(max-width:560px) 100vw, 50vw" preload={featured}/><div><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p>{formatPrice(product.priceMinor)}</p><p>{product.stock ? `${product.stock} available` : 'Currently unavailable'}</p></div></article>;
}
