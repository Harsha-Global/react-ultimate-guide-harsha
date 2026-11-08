# Product Explorer - visual specification

These wireframes use the supplied product illustrations and the application's existing light visual style. The separate course motion graphics retain their own palette and typography.

| Element | Implementation reference |
| --- | --- |
| Typeface | Arial with sans-serif fallback; 1.5 line height |
| Page | Background #f3f6fb, text #172d45; main maximum width 1120px with 24px padding |
| Muted text | #526b85 |
| Controls area | #e5edf8, 20px padding and gaps, 12px corner radius; wrapping row |
| Inputs/select | White, #75889c border, 6px radius, 9px padding; visible labels |
| Grid | Auto-fit columns with 230px minimum (limited to available width), 20px gaps |
| Cards | White, #d6e0ed border, 16px padding/radius; 170px contained illustrations |
| Selected card | 2px #1468d4 border; View details button reports its pressed state |
| Keyboard focus | 3px #1468d4 outline with 3px offset |
| Details | 280px desktop column, 24px layout gap; 20px padding and 16px radius |
| Narrow layout | At 800px and below, details stack after the grid; no horizontal page overflow |
| Availability | Text labels plus #17664f (available) / #87522b (unavailable) |
| Original controls | Name search and category only |

Nominal wireframe widths are 1440px desktop and 390px mobile. They communicate hierarchy, content, states, and layout. Exact text heights and control rendering vary with browser/font metrics. The CSS and the written acceptance checks define implementation details.

Use illustrations from the lecture's `product-explorer/src/assets`. Availability is already part of the original data. The later checkbox is a separate change request.
