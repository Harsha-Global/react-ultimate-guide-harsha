# Solution explanation

The missing guard belongs after finding the current line and before increasing it. It compares that line with the selected product's own maxQuantity. The >= check handles both the boundary and an already excessive line. The existing availability check prevents adding unavailable products. Mapping replaces only the changed row, so other rows retain their identity and order. No-op array identity is deliberately not part of this exercise's contract, matching the lecture helper.
