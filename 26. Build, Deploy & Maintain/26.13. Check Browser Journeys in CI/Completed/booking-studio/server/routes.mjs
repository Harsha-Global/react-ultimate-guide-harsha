import { handleTypedBooking, resetTypedBookings } from "./typedBookings.mjs";
const bookings = new Map();
const capacity = { morning: 5, evening: 0 };
const initialReviews = [
    {
        id: "review-1",
        clientId: "seed-1",
        name: "Maya",
        text: "A calm afternoon, with plenty of room to try things out.",
    },
    {
        id: "review-2",
        clientId: "seed-2",
        name: "Sam",
        text: "I arrived with no experience and left with a bowl I made myself.",
    },
];
let reviews = [...initialReviews];
function reset() {
    resetTypedBookings();
    bookings.clear();
    reviews = [...initialReviews];
    capacity.morning = 5;
    capacity.evening = 0;
}
function send(res, status, body) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(body));
}
async function bodyOf(req) {
    let text = "";
    for await (const chunk of req) {
        text += chunk;
        if (text.length > 16000)
            throw new Error("Request too large");
    }
    return JSON.parse(text);
}
export async function handleApi(req, res, slow = false) {
    const path = new URL(req.url ?? "/", "http://localhost").pathname;
    if (path === "/api/typed-bookings" || path.startsWith("/api/typed-bookings/"))
        return handleTypedBooking(req, res, path, slow);
    if (req.method === "GET" && path === "/api/health")
        return send(res, 200, {
            status: "ready",
            mode: slow ? "slow demonstration" : "normal",
        });
    if (req.method === "POST" && path === "/api/reset") {
        reset();
        return send(res, 200, { status: "reset" });
    }
    if (req.method === "GET" && path === "/api/studio-notice") {
        if (slow)
            await new Promise((resolve) => setTimeout(resolve, 1600));
        return send(res, 200, {
            message: "Please arrive ten minutes before your session.",
        });
    }
    if (req.method === "GET" && path === "/api/reviews")
        return send(res, 200, reviews);
    if (req.method === "POST" && path === "/api/reviews") {
        let data;
        try {
            data = await bodyOf(req);
        }
        catch {
            return send(res, 400, { message: "Send a valid JSON request." });
        }
        if (slow)
            await new Promise((resolve) => setTimeout(resolve, 1600));
        if (!data ||
            typeof data !== "object" ||
            typeof data.clientId !== "string" ||
            !data.clientId ||
            data.clientId.length > 100 ||
            typeof data.name !== "string" ||
            data.name.trim().length < 2 ||
            data.name.trim().length > 80 ||
            typeof data.text !== "string" ||
            data.text.trim().length < 10 ||
            data.text.trim().length > 500)
            return send(res, 422, {
                message: "Use a name with at least two characters and a review from 10 to 500 characters.",
            });
        if (/https?:\/\/|www\./i.test(data.text))
            return send(res, 422, {
                message: "Please remove links from your review and try again.",
            });
        const previous = reviews.find((review) => review.clientId === data.clientId);
        if (previous) {
            if (previous.name !== data.name.trim() ||
                previous.text !== data.text.trim())
                return send(res, 409, {
                    message: "This review identifier was already used with different details. Reload to check the saved review.",
                });
            return send(res, 200, previous);
        }
        const review = {
            id: `review-${reviews.length + 1}`,
            clientId: data.clientId,
            name: data.name.trim(),
            text: data.text.trim(),
        };
        reviews = [...reviews, review];
        return send(res, 201, review);
    }
    if (req.method === "POST" && path === "/api/bookings") {
        let data;
        try {
            data = await bodyOf(req);
        }
        catch {
            return send(res, 400, { message: "Send a valid JSON request." });
        }
        if (slow)
            await new Promise((resolve) => setTimeout(resolve, 1600));
        if (!data ||
            typeof data !== "object" ||
            typeof data.requestId !== "string" ||
            data.requestId.length > 100 ||
            !data.requestId ||
            typeof data.name !== "string" ||
            data.name.trim().length < 2 ||
            data.name.trim().length > 80 ||
            typeof data.email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
            !["morning", "evening"].includes(data.slot))
            return send(res, 422, {
                message: "Check the guest name, email address and session.",
            });
        const normalized = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            slot: data.slot,
        };
        const previous = bookings.get(data.requestId);
        if (previous) {
            if (JSON.stringify(previous.input) !== JSON.stringify(normalized))
                return send(res, 409, {
                    message: "This request was already accepted with different details. Reload before making a new booking.",
                });
            return send(res, 200, previous.result);
        }
        if (capacity[data.slot] === 0)
            return send(res, 409, {
                message: "That session is full. Choose the Morning session and try again.",
            });
        capacity[data.slot]--;
        const result = {
            reference: `WH-${String(bookings.size + 1).padStart(4, "0")}`,
            name: normalized.name,
            slot: normalized.slot,
        };
        bookings.set(data.requestId, { input: normalized, result });
        return send(res, 201, result);
    }
    send(res, 404, { message: "That API route does not exist." });
}
