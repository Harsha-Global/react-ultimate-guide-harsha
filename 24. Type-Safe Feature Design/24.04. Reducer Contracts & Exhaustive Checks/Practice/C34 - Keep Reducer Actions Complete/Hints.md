# Keep Reducer Actions Complete

1. Add a case for the exact groupRenamed discriminant.
2. Narrow the state kind before creating the changed group.
3. Once both actions are handled, the default branch receives never.
