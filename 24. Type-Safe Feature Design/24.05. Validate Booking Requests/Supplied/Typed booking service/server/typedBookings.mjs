import { randomUUID } from "node:crypto";
const accepted = new Map();
const saved = new Map();
const seats = { morning: 12, evening: 0 };
function send(res, status, value) { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(value)); }
export function resetTypedBookings() { accepted.clear(); saved.clear(); seats.morning=12; seats.evening=0; }
export async function handleTypedBooking(req, res, path, slow=false) {
    if (slow) await new Promise(resolve=>setTimeout(resolve, 1200));
    if (req.method === "GET") {
        const reference = path.slice("/api/typed-bookings/".length);
        const value = saved.get(reference);
        return value ? send(res, 200, value) : send(res, 404, { message: "Booking not found." });
    }
    if (req.method !== "POST" || path !== "/api/typed-bookings")
        return send(res, 405, { message: "Method not supported." });
    try {
        // The recording creates the shared schema after the service has started.
        const { bookingRequestSchema } = await import("../shared/bookingSchema.ts");
        let text = "";
        for await (const chunk of req) {
            text += chunk;
            if (text.length > 16000)
                return send(res, 413, { message: "Request too large." });
        }
        const checked = bookingRequestSchema.safeParse(JSON.parse(text));
        if (!checked.success)
            return send(res, 422, { message: "Check the contact details and every name in this booking." });
        const { requestId, ...details } = checked.data;
        const signature = JSON.stringify(details);
        const prior = accepted.get(requestId);
        if (prior)
            return signature === prior.signature ? send(res, 200, prior.result) : send(res, 409, { message: "This request was already accepted with different details. Open the original confirmation before starting again." });
        const places = details.kind === "individual" ? 1 : details.attendees.length;
        if (seats[details.slot] < places)
            return send(res, 409, { message: "There are not enough places in that session. Choose another session." });
        const result = { reference: randomUUID(), kind: details.kind, name: details.name, slot: details.slot, places };
        seats[details.slot] -= places;
        accepted.set(requestId, { signature, result });
        // The public confirmation contains no contact details or attendee names.
        saved.set(result.reference, { ...result, name: "" });
        return send(res, 201, result);
    }
    catch {
        return send(res, 400, { message: "Send a valid booking request." });
    }
}
