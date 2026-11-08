# Solution explanation

The predicate accepts online attendance immediately. For in-person attendance, it checks city.length >= 2. The schema has already trimmed city before this callback runs, so the helper does not need to repeat that transformation. Returning false lets the surrounding refinement attach its configured message to the city field. The helper reads the input without changing it. This native exercise checks the rule itself; the lecture project demonstrates its Zod and React Hook Form integration.
