# Release Review

Role: a teammate asks whether Booking Studio is ready for a small demonstration. The home page works, but the teammate has not checked a saved confirmation after reload. Ask which source and build are being reviewed, agree on a concrete booking/reload/recovery check, explain the in-memory restart limit, and state what evidence would support release.

Do not declare the application production-ready from a green build alone. A useful response identifies the uncertain journey, chooses the appropriate check, explains its purpose, and proposes a clear next action. Expected conversation: 5–8 minutes.

If native Role Play is unavailable in the course editor, retain this as a structured practice brief; do not silently claim a native role-play activity exists.

Instructor model: “Let's check the deployed commit, then create a sample group booking, open its confirmation and reload the address. We'll also try an unknown reference and verify the recovery link. A passing result supports that specific demo journey. This service stores bookings in memory, so a restart can clear them; it is not persistent customer booking storage.”
