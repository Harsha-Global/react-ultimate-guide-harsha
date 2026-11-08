export type Stock = { id:string; stock:number; revision:number };
export function parseStock(value:unknown,expectedId:string):Stock {
 if(typeof value!=='object'||value===null) throw new Error('Invalid stock response');
 const p=value as Record<string,unknown>;
 if(p.id!==expectedId||!Number.isInteger(p.stock)||(p.stock as number)<0||!Number.isInteger(p.revision)||(p.revision as number)<1) throw new Error('Invalid stock response');
 return {id:expectedId,stock:p.stock as number,revision:p.revision as number};
}
