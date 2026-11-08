# Solution explained

ProductCard consumes the supplied props, so another product works without changing the component definition. A numeric zero is inserted directly and is not replaced by a falsy fallback.

ProductList gives the empty input its own early return. The normal branch maps every input item in order. The key is on li because li is the array element returned directly; its stable ID follows the same product when positions change. The child receives name/price through ordinary props, not through key.

The JSX and TSX solutions have the same runtime component structure. The typed companion adds the prop/data contracts and keeps strict checking. Test code is author/grader material; learners only need to interpret its named feedback.
