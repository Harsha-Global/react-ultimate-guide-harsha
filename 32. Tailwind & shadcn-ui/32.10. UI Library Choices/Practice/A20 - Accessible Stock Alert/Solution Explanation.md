# Solution review

ProductEditor registers reorderLevel once with valueAsNumber. The supplied schema rejects NaN, fractions and out-of-range values; the label/help/error IDs and focus use the same accessible pattern as the other fields. The readOnly pending state keeps input values and focus available. No duplicate React value state is introduced.

isLowStock returns stock>0 && stock<=reorderLevel. The card, modal and summary count already import the helper, so one correction fixes all three. Existing stock===0 logic retains the separate Unavailable state. The service's accepted Product includes reorderLevel, and the parent replaces the matching list record only on success.

The supplied API contract tests exercise rejection and accepted zero; stock tests cover equality, threshold changes and zero. Browser evidence is still needed for actual labels, focus, pending/failed save and responsive/theme behavior.
