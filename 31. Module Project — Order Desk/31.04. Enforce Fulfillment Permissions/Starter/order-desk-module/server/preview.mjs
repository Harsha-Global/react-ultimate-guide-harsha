import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
const requireSession = true;
const seed = [
  {
    id: "OD-1041",
    customer: "Avery Miller",
    item: "Trail Backpack",
    units: 2,
    total: 158,
    status: "ready",
    version: 1,
  },
  {
    id: "OD-1042",
    customer: "Jordan Lee",
    item: "Desk Lamp",
    units: 1,
    total: 64,
    status: "payment-pending",
    version: 1,
  },
  {
    id: "OD-1043",
    customer: "Casey Reed",
    item: "Travel Mug",
    units: 3,
    total: 72,
    status: "ready",
    version: 1,
  },
  {
    id: "OD-1044",
    customer: "Morgan Hayes",
    item: "Linen Throw",
    units: 1,
    total: 49,
    status: "shipped",
    version: 1,
  },
  {
    id: "OD-1045",
    customer: "Riley Carter",
    item: "Desk Organizer",
    units: 2,
    total: 56,
    status: "ready",
    version: 1,
  },
];
const workspaces = {
  north: structuredClone(seed),
  south: seed.map((o) => ({
    ...o,
    customer: `South ${o.customer}`,
    total: o.total + 10,
  })),
};
const sessions = new Map();
const streams = new Map();
const send = (res, status, value) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
};
async function body(req) {
  let text = "";
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 8192) throw Error("Large body");
  }
  return JSON.parse(text || "{}");
}
const tokenFor = (req) =>
  /\bod_session=([^;]+)/.exec(req.headers.cookie || "")?.[1];
function revoke(token) {
  sessions.delete(token);
  for (const peer of streams.get(token) || []) peer.end();
  streams.delete(token);
}
function broadcast(workspace, order) {
  for (const [token, peers] of streams)
    if (sessions.get(token) === workspace)
      for (const res of peers) res.write(`data: ${JSON.stringify(order)}\n\n`);
}
createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:5189");
  const token = tokenFor(req);
  if (req.method === "GET" && url.pathname === "/api/health")
    return send(res, 200, { status: "ok" });
  try {
    if (url.pathname === "/api/session") {
      if (req.method === "POST") {
        const { workspace } = await body(req);
        if (!Object.hasOwn(workspaces, workspace))
          return send(res, 422, { message: "Choose North or South." });
        revoke(token);
        const next = randomUUID();
        sessions.set(next, workspace);
        res.setHeader(
          "Set-Cookie",
          `od_session=${next}; HttpOnly; SameSite=Strict; Path=/api`,
        );
        return send(res, 200, { workspace });
      }
      if (req.method === "DELETE") {
        revoke(token);
        res.setHeader(
          "Set-Cookie",
          "od_session=; Max-Age=0; HttpOnly; SameSite=Strict; Path=/api",
        );
        return send(res, 200, { workspace: null });
      }
      if (req.method === "GET")
        return send(res, 200, { workspace: sessions.get(token) || null });
    }
    if (req.method === "POST" && url.pathname === "/api/demo/expire") {
      revoke(token);
      return send(res, 200, {
        message: "Demo session expired. Refresh the queue.",
      });
    }
    const workspace = sessions.get(token) || (requireSession ? null : "north");
    if (!workspace)
      return send(res, 401, {
        message: "Choose a demo workspace to continue.",
      });
    const orders = workspaces[workspace];
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (requireSession && sessions.get(token) !== workspace)
      return send(res, 401, {
        message: "The demo session changed. Sign in again.",
      });
    if (req.method === "GET" && url.pathname === "/api/orders") {
      const search = (url.searchParams.get("search") || "")
        .trim()
        .toLowerCase();
      const status = url.searchParams.get("status") || "all";
      const rows = orders.filter(
        (o) =>
          `${o.id} ${o.customer} ${o.item}`.toLowerCase().includes(search) &&
          (status === "all" || o.status === status),
      );
      if (url.searchParams.has("page")) {
        const page = Number(url.searchParams.get("page"));
        if (!Number.isInteger(page) || page < 1)
          return send(res, 422, {
            message: "Page must be a positive integer.",
          });
        return send(res, 200, {
          items: rows.slice((page - 1) * 2, page * 2),
          page,
          nextPage: page * 2 < rows.length ? page + 1 : null,
          total: rows.length,
        });
      }
      return send(res, 200, rows);
    }
    if (req.method === "GET" && url.pathname === "/api/order-events") {
      if (!token || !sessions.has(token))
        return send(res, 401, {
          message: "A demo session is required for the stream.",
        });
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      res.write(": connected\n\n");
      // Send current versioned records after connecting, closing the snapshot-to-stream gap.
      for (const order of orders)
        res.write(`data: ${JSON.stringify(order)}\n\n`);
      const peers = streams.get(token) || new Set();
      peers.add(res);
      streams.set(token, peers);
      const timer = setInterval(() => res.write(": heartbeat\n\n"), 10000);
      req.on("close", () => {
        clearInterval(timer);
        peers.delete(res);
        if (!peers.size) streams.delete(token);
      });
      return;
    }
    const match = /^\/api\/orders\/([^/]+)$/.exec(url.pathname);
    if (match) {
      const order = orders.find((o) => o.id === decodeURIComponent(match[1]));
      if (!order) return send(res, 404, { message: "Order not found." });
      if (req.method === "GET") return send(res, 200, order);
      if (req.method === "PATCH") {
        const input = await body(req);
        await new Promise((resolve) => setTimeout(resolve, 650));
        if (requireSession && sessions.get(token) !== workspace)
          return send(res, 401, { message: "The demo session changed." });
        if (input.version !== order.version)
          return send(res, 409, {
            message: "This order changed. Review the refreshed version.",
          });
        if (input.status !== "ready" && input.status !== "shipped")
          return send(res, 422, {
            message: "Choose a supported status.",
            fields: { status: "Choose ready or shipped." },
          });
        if (order.status === "payment-pending")
          return send(res, 422, {
            message: "Payment must be confirmed before fulfillment.",
            fields: { status: "This order is waiting for payment." },
          });
        order.status = input.status;
        order.version++;
        broadcast(workspace, order);
        return send(res, 200, order);
      }
    }
    if (req.method === "POST" && url.pathname === "/api/demo/change") {
      const order = orders[0];
      order.status = order.status === "ready" ? "shipped" : "ready";
      order.version++;
      broadcast(workspace, order);
      return send(res, 200, order);
    }
    if (req.method === "POST" && url.pathname === "/api/packing-preview") {
      const { ids } = await body(req);
      await new Promise((resolve) => setTimeout(resolve, 650));
      if (
        !Array.isArray(ids) ||
        !ids.length ||
        ids.length > 20 ||
        new Set(ids).size !== ids.length ||
        !ids.every((id) =>
          orders.some((o) => o.id === id && o.status === "ready"),
        )
      )
        return send(res, 422, {
          message: "Choose one or more ready orders only.",
        });
      return send(res, 200, {
        count: ids.length,
        message: `Packing preview prepared for ${ids.length} order${ids.length === 1 ? "" : "s"}.`,
      });
    }
    send(res, 404, { message: "Not found." });
  } catch {
    if (!res.headersSent)
      send(res, 400, { message: "Send a valid JSON request." });
    else res.end();
  }
}).listen(5189, "127.0.0.1", () =>
  console.log("Order API: http://127.0.0.1:5189/api/health"),
);
