import { createServer } from "node:http";
const orders = [{"id": "OD-1041", "status": "ready"}, {"id": "OD-1042", "status": "payment-pending"}, {"id": "OD-1043", "status": "ready"}, {"id": "OD-1044", "status": "shipped"}, {"id": "OD-1045", "status": "ready"}];
const send = (res, status, value) => { res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify(value)); };
createServer(async (req, res) => {
  if (req.url === "/api/health") return send(res, 200, { status: "ok" });
  if (req.method !== "POST" || req.url !== "/api/packing-preview") return send(res, 404, { message: "Not found." });
  try {
    let text = "";
    for await (const chunk of req) { text += chunk; if (text.length > 8192) return send(res, 413, { message: "Request too large." }); }
    const { ids } = JSON.parse(text);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > 20 || new Set(ids).size !== ids.length || !ids.every(id => orders.some(order => order.id === id && order.status === "ready"))) {
      return send(res, 422, { message: "Choose one or more ready orders only." });
    }
    send(res, 200, { count: ids.length, message: `Packing preview prepared for ${ids.length} order${ids.length === 1 ? "" : "s"}.` });
  } catch { send(res, 400, { message: "Send a valid JSON request." }); }
}).listen(5189, "127.0.0.1", () => console.log("Preview API: http://127.0.0.1:5189/api/health"));
