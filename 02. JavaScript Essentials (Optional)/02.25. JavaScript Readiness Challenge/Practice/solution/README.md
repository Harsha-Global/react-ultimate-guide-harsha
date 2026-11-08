# JavaScript Readiness Challenge — explained solution

The filter keeps the in-stock p2 record. Mapping creates a new object for p2 with count 5; the original record stays at 4. Its price 18 produces total 90 through the existing reduce helper. Awaiting the reporting function allows the caller to inspect the actual outcome. While the challenge function waits, the top-level discount calls run and produce 90 and 80 from separate retained rate parameters. The reporting function logs completion before the selected outcome reaches the challenge function. An empty filtered array safely displays count 0 through optional chaining/nullish fallback and sums to 0.

## Expected output

```text
Selected entries: 1
Updated count: 5
Selected total: 90
Original total: 108
Original first count: 4
Closure prediction: 90, 80
Save attempt finished
Saved total: 90
```

All source files in this folder form the complete solution. Keep them together and run the local server in this folder, as described in the practice brief.
