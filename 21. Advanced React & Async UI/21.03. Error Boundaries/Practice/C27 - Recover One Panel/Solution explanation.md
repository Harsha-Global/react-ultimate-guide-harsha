# Recover One Panel

The boundary replaces only its own subtree after a rendering error. Keeping VisitNote outside that subtree preserves both its mounted state and its editable control. Resetting the boundary remounts the failed panel, whose local broken flag starts as false. Moving all state higher would add work without solving a broader requirement in this example.
