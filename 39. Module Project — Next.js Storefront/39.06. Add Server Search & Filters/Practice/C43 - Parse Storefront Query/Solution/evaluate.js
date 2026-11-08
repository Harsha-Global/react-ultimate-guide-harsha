describe('Parse Storefront Query', function(){
 it('defaults omitted values',function(){expect(readStorefrontQuery({})).toEqual({q:'',category:'All',sort:'featured'});});
 it('trims search text',function(){expect(readStorefrontQuery({q:'  studio  '}).q).toBe('studio');});
 it('trims before limiting the search',function(){expect(readStorefrontQuery({q:'  '+ 'x'.repeat(70)+'  '}).q).toBe('x'.repeat(60));});
 it('keeps search case for the controls',function(){expect(readStorefrontQuery({q:'Studio'}).q).toBe('Studio');});
 it('rejects a repeated search',function(){expect(readStorefrontQuery({q:['lamp','bag']}).q).toBe('');});
 it('rejects even a one-item search array',function(){expect(readStorefrontQuery({q:['lamp']}).q).toBe('');});
 it('accepts all four exact categories',function(){['Workspace','Travel','Everyday','Audio'].forEach(category=>expect(readStorefrontQuery({category}).category).toBe(category));});
 it('defaults unsupported categories',function(){expect(readStorefrontQuery({category:'Other'}).category).toBe('All');});
 it('does not normalize category case',function(){expect(readStorefrontQuery({category:'workspace'}).category).toBe('All');});
 it('does not trim category names',function(){expect(readStorefrontQuery({category:' Workspace '}).category).toBe('All');});
 it('rejects repeated categories',function(){expect(readStorefrontQuery({category:['Workspace']}).category).toBe('All');});
 it('accepts the exact price sort',function(){expect(readStorefrontQuery({sort:'price'}).sort).toBe('price');});
 it('defaults unsupported and repeated sorts',function(){['Price',' price ',['price']].forEach(sort=>expect(readStorefrontQuery({sort}).sort).toBe('featured'));});
 it('normalizes independent fields together',function(){expect(readStorefrontQuery({q:' bag ',category:'Travel',sort:'price'})).toEqual({q:'bag',category:'Travel',sort:'price'});});
 it('does not mutate the raw query',function(){const raw=Object.freeze({q:' lamp ',category:'Workspace',sort:'price'});readStorefrontQuery(raw);expect(raw.q).toBe(' lamp ');});
 it('returns only the public normalized fields',function(){expect(Object.keys(readStorefrontQuery({extra:'private'})).sort()).toEqual(['category','q','sort']);});
});
