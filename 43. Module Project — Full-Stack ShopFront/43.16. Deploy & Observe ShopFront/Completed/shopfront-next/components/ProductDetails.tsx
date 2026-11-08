import { StorePurchase } from './StorePurchase';
import { ShortlistButton } from './ShortlistButton';
import Image from 'next/image';
import { formatPrice, type Product } from '@/lib/catalog';
export function ProductDetails({ product, featured=false }: { product: Product; featured?:boolean }) {
 return <div className="detail"><Image src={product.image} alt={product.name} width={800} height={800} sizes="(max-width:560px) 100vw, 50vw" preload={featured}/><div><p className="eyebrow">{product.category}</p><p className="badge">{product.id}</p><p>{formatPrice(product.priceMinor)}</p><p>{product.stock ? `${product.stock} available in our sample catalog.` : 'Currently unavailable. Please check again later.'}</p><p>A thoughtfully selected essential from our four-product course collection.</p><ShortlistButton id={product.id} name={product.name}/><StorePurchase productId={product.id} stock={product.stock}/></div></div>;
}
