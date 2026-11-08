import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const requestHeaders = request.headers;
  const { id } = await params;
  async function readStatus() {
    const session = await auth.api.getSession({ headers: requestHeaders, query: { disableCookieCache: true } });
    if (!session) return null;
    return db.order.findFirst({ where: { id, customer: { userId: session.user.id } }, select: { id: true, status: true, receipt: { select: { orderId: true } } } });
  }
  if (!await readStatus()) return new Response('Order access required.', { status: 401, headers: { 'Cache-Control': 'private, no-store' } });
  const encoder = new TextEncoder(); let closed = false;
  let poll: ReturnType<typeof setTimeout>; let lifetime: ReturnType<typeof setTimeout>;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      function stop() {
        if (closed) return; closed = true; clearTimeout(poll); clearTimeout(lifetime); controller.close();
      }
      async function tick() {
        try {
          const order = await readStatus(); if (closed) return;
          if (!order) { controller.enqueue(encoder.encode('event: access-denied\ndata: {}\n\n')); stop(); return; }
          controller.enqueue(encoder.encode(`id: ${order.id}:${order.status}:${Boolean(order.receipt)}\nevent: order-status\ndata: ${JSON.stringify(order)}\n\n`));
          poll = setTimeout(tick, 2000);
        } catch { stop(); }
      }
      lifetime = setTimeout(stop, 30000);
      request.signal.addEventListener('abort', stop, { once: true });
      void tick();
    },
    cancel() { closed = true; clearTimeout(poll); clearTimeout(lifetime); },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'private, no-store, no-transform', 'X-Accel-Buffering': 'no' } });
}
