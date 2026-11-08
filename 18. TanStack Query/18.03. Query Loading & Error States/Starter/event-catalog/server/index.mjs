import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { z } from "zod";
import { seeds, venues } from "./seeds.mjs";
import { eventEditSchema } from "../src/events.ts";
const file = new URL("./data.json", import.meta.url);
let records;
try {
  records = JSON.parse(await readFile(file, "utf8"));
} catch {
  records = structuredClone(seeds);
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function reply(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}
async function body(req) {
  let text = "";
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 10000) throw new Error("Request too large.");
  }
  return JSON.parse(text);
}
const app = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:4088");
    if (req.method === "GET" && url.pathname === "/api/health")
      return reply(res, 200, {
        status: "ok",
        service: "Event Desk catalog practice API",
      });
    if (req.method === "GET" && url.pathname === "/api/events") {
      await delay(500);
      const q = (url.searchParams.get("q") || "").trim().toLowerCase();
      const category = url.searchParams.get("category") || "all";
      const sort = url.searchParams.get("sort") || "title";
      const raw = Number(url.searchParams.get("page") || 1);
      const page = Number.isInteger(raw) && raw > 0 ? raw : 1;
      const pageSize = 3;
      if (q === "server-error")
        return reply(res, 503, {
          message: "The event catalog is temporarily unavailable.",
        });
      const filtered = records
        .filter(
          (e) =>
            (category === "all" || e.category === category) &&
            e.title.toLowerCase().includes(q),
        )
        .sort((a, b) =>
          sort === "price" ? a.price - b.price : a.title.localeCompare(b.title),
        );
      return reply(res, 200, {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        total: filtered.length,
        page,
        pageSize,
      });
    }
    if (req.method === "GET" && /^\/api\/events\/e\d+$/.test(url.pathname)) {
      await delay(450);
      const item = records.find((e) => e.id === url.pathname.split("/").at(-1));
      return item
        ? reply(res, 200, item)
        : reply(res, 404, { message: "Event not found." });
    }
    if (req.method === "GET" && /^\/api\/venues\/v\d+$/.test(url.pathname)) {
      await delay(300);
      const item = venues.find((e) => e.id === url.pathname.split("/").at(-1));
      return item
        ? reply(res, 200, item)
        : reply(res, 404, { message: "Venue not found." });
    }
    if (
      req.method === "PATCH" &&
      /^\/api\/events\/e\d+(\/publication)?$/.test(url.pathname)
    ) {
      const id = url.pathname.split("/")[3];
      const index = records.findIndex((e) => e.id === id);
      if (index === -1) return reply(res, 404, { message: "Event not found." });
      const publication = url.pathname.endsWith("/publication");
      const parsed = (
        publication ? z.object({ published: z.boolean() }) : eventEditSchema
      ).safeParse(await body(req));
      await delay(900);
      if (!parsed.success)
        return reply(res, 422, { message: "The event change is not valid." });
      if (publication && id === "e3" && parsed.data.published)
        return reply(res, 409, {
          message:
            "Supper club cannot be published until its venue approval is complete.",
        });
      if (!publication && parsed.data.title.toLowerCase() === "reserved title")
        return reply(res, 409, {
          message: "This title is reserved. Choose another title.",
        });
      const next = { ...records[index], ...parsed.data };
      records[index] = next;
      await writeFile(file, JSON.stringify(records, null, 2));
      return reply(res, 200, next);
    }
    return reply(res, 404, { message: "Endpoint not found." });
  } catch (error) {
    reply(res, 400, {
      message: error instanceof Error ? error.message : "Request failed.",
    });
  }
});
app.listen(4088, "127.0.0.1", () =>
  console.log("Event Desk catalog API: http://127.0.0.1:4088/api/health"),
);
