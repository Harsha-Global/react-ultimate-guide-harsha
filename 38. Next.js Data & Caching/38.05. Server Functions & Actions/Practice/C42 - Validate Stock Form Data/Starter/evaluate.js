describe('Validate Stock Form Data',function(){
 function form(id,stock){const f=new FormData();if(id!==null)f.set('id',id);if(stock!==null)f.set('stock',stock);return f;}
 it('accepts zero',function(){expect(parseStockInput(form('P-101','0'))).toEqual({id:'P-101',stock:0});});
 it('accepts the upper bound',function(){expect(parseStockInput(form('P-102','99'))).toEqual({id:'P-102',stock:99});});
 it('trims stock text',function(){expect(parseStockInput(form('P-103',' 7 '))).toEqual({id:'P-103',stock:7});});
 it('rejects an empty stock',function(){expect(parseStockInput(form('P-101',''))).toBe(null);});
 it('rejects a missing stock',function(){expect(parseStockInput(form('P-101',null))).toBe(null);});
 it('rejects a fraction',function(){expect(parseStockInput(form('P-101','1.5'))).toBe(null);});
 it('rejects a negative value',function(){expect(parseStockInput(form('P-101','-1'))).toBe(null);});
 it('rejects 100',function(){expect(parseStockInput(form('P-101','100'))).toBe(null);});
 it('rejects exponent notation',function(){expect(parseStockInput(form('P-101','1e1'))).toBe(null);});
 it('rejects an altered hidden id',function(){expect(parseStockInput(form('../other','7'))).toBe(null);});
 it('rejects a missing id',function(){expect(parseStockInput(form(null,'7'))).toBe(null);});
 it('rejects a file in id',function(){const f=form('P-101','7');f.set('id',new Blob(['P-101']),'id.txt');expect(parseStockInput(f)).toBe(null);});
 it('rejects a file in stock',function(){const f=form('P-101','7');f.set('stock',new Blob(['7']),'stock.txt');expect(parseStockInput(f)).toBe(null);});
 it('does not mutate submitted fields',function(){const f=form('P-101',' 7 ');parseStockInput(f);expect(f.get('stock')).toBe(' 7 ');});
});
