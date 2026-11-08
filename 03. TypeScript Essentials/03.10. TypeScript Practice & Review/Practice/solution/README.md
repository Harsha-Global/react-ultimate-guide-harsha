# Explained solution

The union describes the new alternative; the pricing function implements its rate; the parser enforces the external-data rules. Existing subtotal/discount/reporting logic remains reusable. The unchanged generic helper preserves the caller’s item type.

Run `npm ci` once in that folder, then `npm start` after each edit.

## Observed output

```text
Total: 21.00
Ticket count must be a whole number from 1 to 6
First movie: Skyward
First category: standard
Empty selection: No movie
```
