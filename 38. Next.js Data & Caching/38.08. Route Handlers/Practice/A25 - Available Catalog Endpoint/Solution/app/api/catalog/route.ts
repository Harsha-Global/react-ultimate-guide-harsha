import { readCachedCatalog } from '@/lib/catalogCache';
const categories=['All','Workspace','Travel','Everyday','Audio'];
export async function GET(request:Request) {
 const params=new URL(request.url).searchParams;
 const stockFlags=params.getAll('inStock');
 if(stockFlags.length>1 || (stockFlags.length===1 && !['0','1'].includes(stockFlags[0]))) return Response.json({message:'Use one inStock value: 0 or 1.'},{status:400});
 const availableOnly=stockFlags[0]==='1';
 const values=params.getAll('category');
 const category=values[0] ?? 'All';
 if(values.length>1 || !categories.includes(category)) return Response.json({message:'Choose one supported category.'},{status:400});
 try {
  const snapshot=await readCachedCatalog(category);
  const result={...snapshot,products:availableOnly?snapshot.products.filter(product=>product.stock>0):snapshot.products};
  return Response.json(result,{headers:{'cache-control':'no-store'}});
 } catch { return Response.json({message:'Catalog is temporarily unavailable.'},{status:503}); }
}
