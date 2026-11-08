# Refresh a Memoized Filter

A memoized calculation can be reused only while all of its dependencies are unchanged. The filter reads movies, query and category, so each belongs in its dependency list. The filtered list remains derived from those inputs. The fix restores correctness; whether memoization is worth keeping still depends on actual cost.
