# Check the Staff Permission

The missing-session branch distinguishes authentication from authorization. A member is signed in but lacks this permission. The body is deliberately unused: trusting a role supplied by the caller would let that caller grant itself access. This helper assumes authentication was already performed by the server; passing a client-created user into it would break that assumption.
