# Review and rubric

| Area | Weight | Evidence |
|---|---:|---|
| Feature behavior |40%|Favorite/unfavorite, no duplicates, favorites-only combines with existing filters.|
| React patterns |25%|One owner, typed callbacks, immutable identifiers, derived list and selected product.|
| Edge cases and accessibility |25%|No favorites, no matches, selected hidden item, labels, keyboard activation, pressed states.|
| Explanation |10%|Concise rationale and observed checks.|

Worked solution: App owns favoriteIds and favoritesOnly. A pure functional toggle filters an existing id out or appends a missing id. The grid derives isFavorite for each card; its callback carries a product id. The fourth filter predicate permits all products when off and only favorite ids when on. Existing predicates remain unchanged. Selection still derives from the complete source collection. No Effect, persistence, API or new library is needed.

Review sequence: enable favorites-only with none→empty; turn it off; favorite Trail Backpack and Wireless Headphones→enable→2; choose Travel→1; select backpack; remove its favorite→0 while retained details explain the hidden selection. Disable the filters to recover. Use Tab and Space/Enter on controls. Reload to verify the documented local-only behavior.
