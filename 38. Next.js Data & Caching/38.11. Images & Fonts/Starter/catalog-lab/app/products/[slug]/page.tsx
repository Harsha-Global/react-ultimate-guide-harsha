import type { Metadata } from 'next';
import { productSchema, safeJsonLd } from '@/lib/productSchema';
import { siteUrl } from '@/lib/site';
import { notFound } from 'next/navigation';
import { readCachedCatalog } from '@/lib/catalogCache';
import { ProductDetails } from '@/components/ProductDetails';
type Props={params:Promise<{slug:string}>};
async function findProduct(slug:string){const snapshot=await readCachedCatalog();return snapshot.products.find(product=>product.slug===slug);}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const product=await findProduct(slug);
 if(!product)return {title:'Product not found',robots:{index:false}};
 return {title:product.name,description:`Explore ${product.name} in the Catalog Lab teaching example.`,alternates:{canonical:`/products/${product.slug}`},openGraph:{title:product.name,images:[{url:product.image,alt:product.name}]}};
}
export default async function ProductPage({params}:Props){
 const {slug}=await params;const product=await findProduct(slug);if(!product)notFound();
 return <><ProductDetails product={product}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:safeJsonLd(productSchema(product,siteUrl.href))}}/></>;
}
