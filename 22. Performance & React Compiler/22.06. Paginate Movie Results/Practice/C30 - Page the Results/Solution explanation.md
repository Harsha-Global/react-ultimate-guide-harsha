# Page the Results

The page number is one-based; array offsets are zero-based. Subtracting one before multiplying gives the correct starting offset. Math.ceil retains a partial last page. Clamping prevents a page made invalid by a smaller filtered result from returning the wrong range.
