import type { Metadata } from 'next';
import { DataCatalog } from '@/components/DataCatalog';
export const metadata:Metadata={title:'Public catalog',description:'Explore the four products in Catalog Lab.',alternates:{canonical:'/catalog'}};
export default function CatalogPage(){return <><h1>Explore the catalog</h1><DataCatalog/></>;}
