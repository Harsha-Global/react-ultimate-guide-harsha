import { createServer } from "node:http";
const slow = process.argv.includes("--slow");
const bookings = new Map();
const capacity = { morning: 5, evening: 0 };
function reset() {
  bookings.clear();
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
    if (text.length > 16000) throw new Error("Request too large");
  }
  return JSON.parse(text);
}
const server = createServer(async (req, res) => {
  const path = new URL(req.url ?? "/", "http://localhost").pathname;
  if (req.method === "GET" && path === "/api/health")
    return send(res, 200, {
      status: "ready",
      mode: slow ? "slow demonstration" : "normal",
    });
  if (req.method === "POST" && path === "/api/reset") {
    reset();
    return send(res, 200, { status: "reset" });
  }
  if (req.method === "POST" && path === "/api/bookings") {
    let data;
    try {
      data = await bodyOf(req);
    } catch {
      return send(res, 400, { message: "Send a valid JSON request." });
    }
    if (slow) await new Promise((resolve) => setTimeout(resolve, 1600));
    if (
      !data ||
      typeof data !== "object" ||
      typeof data.requestId !== "string" ||
      data.requestId.length > 100 ||
      !data.requestId ||
      typeof data.name !== "string" ||
      data.name.trim().length < 2 ||
      data.name.trim().length > 80 ||
      typeof data.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
      !["morning", "evening"].includes(data.slot)
    )
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
          message:
            "This request was already accepted with different details. Reload before making a new booking.",
        });
      return send(res, 200, previous.result);
    }
    if (capacity[data.slot] === 0)
      return send(res, 409, {
        message:
          "That session is full. Choose the Morning session and try again.",
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
});
server.listen(4318, "127.0.0.1", () =>
  console.log(
    `Willow API ready at http://127.0.0.1:4318 (${slow ? "slow demonstration" : "normal"})`,
  ),
);
