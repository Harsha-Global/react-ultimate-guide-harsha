# Preserve a Failed Draft

1. Put await send(draft) inside try/catch.
2. Build the empty draft only in the success branch.
3. Use error instanceof Error before reading its message.
