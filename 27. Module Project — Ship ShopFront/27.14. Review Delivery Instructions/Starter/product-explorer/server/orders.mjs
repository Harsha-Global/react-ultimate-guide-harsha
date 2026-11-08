import { randomUUID } from "node:crypto";
import { orderRequestSchema } from "../shared/orderSchema.ts";
import { requireUser } from "./auth.mjs";
const orders = [];
const accepted = new Map();
const noteFailures = new Set();
function send(res, status, body) { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); }
async function bodyOf(req) { let text = ""; for await (const chunk of req) {
    text += chunk;
    if (text.length > 20000)
        throw new Error("Request too large.");
} return JSON.parse(text); }
export async function handleOrders(req, res, path, readProducts) {
    const user = requireUser(req, res, { write: req.method !== "GET" });
    if (!user)
        return;
    if (req.method === "GET" && path === "/api/orders") {
        await new Promise(resolve => setTimeout(resolve, 300));
        return send(res, 200, { userId: user.id, items: orders.filter(order => order.userId === user.id) });
    }
    if (req.method === "POST" && path === "/api/orders") {
        const checked = orderRequestSchema.safeParse(await bodyOf(req));
        if (!checked.success)
            return send(res, 422, { message: "Check your checkout details and bag." });
        const { requestId, details, cart } = checked.data;
        const key = user.id + ":" + requestId;
        const signature = JSON.stringify({ details, cart });
        const previous = accepted.get(key);
        if (previous)
            return previous.signature === signature
                ? send(res, 200, previous.order)
                : send(res, 409, { message: "This request was already accepted with different details. Check your order history before starting another order." });
        const products = readProducts();
        const lines = [];
        let cents = 0;
        for (const line of cart) {
            const product = products.find(item => item.id === line.productId);
            if (!product || !product.inStock || line.quantity > product.maxQuantity)
                return send(res, 409, { message: "Availability changed. Review your bag before trying again." });
            const price = Math.round(product.price * 100);
            cents += price * line.quantity;
            lines.push({ name: product.name, quantity: line.quantity, unitPrice: price / 100 });
        }
        const order = { id: randomUUID().slice(0, 8), userId: user.id, createdAt: new Date().toISOString(), subtotal: cents / 100, deliveryFee: details.fulfillment.kind === "pickup" ? 0 : details.fulfillment.method === "express" ? 12 : 5, currency: "USD", items: cart.reduce((n, line) => n + line.quantity, 0), lines, note: "", fulfillment: details.fulfillment };
        // Check and record together; do not insert an await between the duplicate check and storage.
        orders.unshift(order);
        accepted.set(key, { signature, order });
        await new Promise(resolve => setTimeout(resolve, 700));
        return send(res, 201, order);
    }
    const noteMatch = path.match(/^\/api\/orders\/([a-f0-9-]+)\/note$/);
    if (req.method === "PUT" && noteMatch) {
        const order = orders.find(item => item.id === noteMatch[1] && item.userId === user.id);
        if (!order)
            return send(res, 404, { message: "Order not found." });
        const body = await bodyOf(req);
        if (typeof body?.text !== "string" || body.text.trim().length < 1 || body.text.trim().length > 120)
            return send(res, 422, { message: "Use a note from 1 to 120 characters." });
        await new Promise(resolve => setTimeout(resolve, 700));
        if (body.text.trim() === "Please leave with Jordan" && !noteFailures.has(order.id)) {
            noteFailures.add(order.id);
            return send(res, 503, { message: "The note was not saved. Please try again." });
        }
        order.note = body.text.trim();
        return send(res, 200, order);
    }
    send(res, 404, { message: "Order endpoint not found." });
}
