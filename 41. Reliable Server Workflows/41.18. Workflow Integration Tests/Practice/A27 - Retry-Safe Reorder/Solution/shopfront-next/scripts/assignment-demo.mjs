import 'dotenv/config';
import pg from 'pg';
const url=new URL(process.env.DATABASE_URL);
if(!['127.0.0.1','localhost'].includes(url.hostname)||url.pathname!=='/shopfront_dev')throw Error('Use the named local shopfront_dev database.');
const db=new pg.Client({connectionString:url.toString()});await db.connect();
try {
 if(process.argv[2]==='cleanup'){
  const rows=await db.query('SELECT "orderId" FROM "OrderItem" WHERE "productId"=$1',['P-A27-DEMO']);const ids=rows.rows.map(x=>x.orderId);
  await db.query('DELETE FROM "OrderItem" WHERE "orderId"=ANY($1)',[ids]);await db.query('DELETE FROM "Order" WHERE id=ANY($1)',[ids]);await db.query('DELETE FROM "Product" WHERE id=$1',['P-A27-DEMO']);console.log('Removed only the A27 browser fixture product and its disposable orders.');
 }else{
  await db.query('INSERT INTO "Product" (id,slug,name,"priceMinor",stock) VALUES ($1,$2,$3,8900,3)',['P-A27-DEMO','a27-practice-lamp','Practice Reorder Lamp']);
  await db.query('INSERT INTO "Order" (id,"customerId") VALUES ($1,$2)',['O-A27-DEMO','C-1']);
  await db.query('INSERT INTO "OrderItem" ("orderId","productId",quantity,"unitPriceMinor") VALUES ($1,$2,1,7900)',['O-A27-DEMO','P-A27-DEMO']);console.log('A27 private browser fixture ready: original $79, current price $89, stock3.');
 }
}finally{await db.end();}
