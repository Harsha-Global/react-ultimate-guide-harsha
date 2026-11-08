# Preserve a Failed Draft

Awaiting the sender keeps an unfinished request distinct from its result. The success branch returns a fresh empty draft after confirmation. The failure branch keeps the values so the user can retry. The caller decides how to render these states; this helper does not change the input object or simulate React itself.
