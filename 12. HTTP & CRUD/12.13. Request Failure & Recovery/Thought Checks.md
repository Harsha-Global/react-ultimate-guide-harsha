# 12.13. Request Failure & Recovery — thought checks

**What is the acceptance test for a failed create?**

No fabricated row; retain the draft, show failure, allow retry, and update the UI only from the successful server response.

**What is the acceptance test for an upload retry?**

Keep the selected file after failure, restore usable controls, and show the confirmed receipt only after successful retry.
