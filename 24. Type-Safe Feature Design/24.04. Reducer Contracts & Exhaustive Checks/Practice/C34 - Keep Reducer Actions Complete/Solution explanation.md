# Keep Reducer Actions Complete

The action describes a requested change, and the reducer applies it only to the relevant state shape. The spread keeps the other group values while replacing its name. Handling both union members makes the default branch exhaustive. Adding another action later will make the local compiler point to assertNever until its case is added.
