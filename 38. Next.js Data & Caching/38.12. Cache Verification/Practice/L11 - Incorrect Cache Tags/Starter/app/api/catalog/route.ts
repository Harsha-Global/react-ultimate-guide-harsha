import { readCachedCatalog } from '@/lib/catalogCache';
const categories=['All','Workspace','Travel','Everyday','Audio'];
export async function GET(request:Request) {
 const values=new URL(request.url).searchParams.getAll('category');
 const category=values[0] ?? 'All';
 if(values.length>1 || !categories.includes(category)) return Response.json({message:'Choose one supported category.'},{status:400});
 try {
  const snapshot=await readCachedCatalog(category);
  return Response.json(snapshot,{headers:{'cache-control':'no-store'}});
 } catch { return Response.json({message:'Catalog is temporarily unavailable.'},{status:503}); }
}
