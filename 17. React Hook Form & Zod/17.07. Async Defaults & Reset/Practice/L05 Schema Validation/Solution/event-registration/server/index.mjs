import http from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { registrationSchema } from "../src/registration.ts";
import { seeds } from "./seeds.mjs";
const dataFile = new URL("./data.json", import.meta.url);
const uploads = new URL("./uploads/", import.meta.url);
let records;
try {
  records = JSON.parse(await readFile(dataFile, "utf8"));
} catch {
  records = structuredClone(seeds);
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function reply(res, status, value) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
}
async function body(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 3 * 1024 * 1024) throw new Error("Request is too large.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
const app = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:4087");
    if (req.method === "GET" && url.pathname === "/api/health")
      return reply(res, 200, {
        status: "ok",
        service: "Event Desk practice API",
      });
    if (
      req.method === "GET" &&
      /^\/api\/attendees\/[a-z0-9-]+$/.test(url.pathname)
    ) {
      await delay(450);
      const id = url.pathname.split("/").at(-1);
      const record = records.find((item) => item.id === id);
      return record
        ? reply(res, 200, record)
        : reply(res, 404, { message: "Attendee not found." });
    }
    if (
      req.method === "PUT" &&
      /^\/api\/attendees\/[a-z0-9-]+$/.test(url.pathname)
    ) {
      const id = url.pathname.split("/").at(-1);
      const index = records.findIndex((item) => item.id === id);
      if (index === -1)
        return reply(res, 404, { message: "Attendee not found." });
      const parsed = registrationSchema.safeParse(
        JSON.parse((await body(req)).toString("utf8")),
      );
      await delay(650);
      if (!parsed.success)
        return reply(res, 422, {
          message: "The registration data is not valid.",
          issues: parsed.error.issues,
        });
      if (parsed.data.email === "taken@example.com")
        return reply(res, 409, {
          message: "This email cannot be used for this attendee.",
          fieldErrors: {
            email: "This email is already registered. Use another address.",
          },
        });
      const values = {
        ...parsed.data,
        ticketCount: String(parsed.data.ticketCount),
      };
      const record = { id, values };
      records[index] = record;
      await writeFile(dataFile, JSON.stringify(records, null, 2));
      return reply(res, 200, record);
    }
    if (req.method === "POST" && url.pathname === "/api/uploads") {
      const request = new Request("http://127.0.0.1:4087/api/uploads", {
        method: "POST",
        headers: { "Content-Type": req.headers["content-type"] ?? "" },
        body: await body(req),
      });
      const form = await request.formData();
      const file = form.get("image");
      if (!(file instanceof File) || file.size === 0)
        return reply(res, 422, { message: "Choose an image file." });
      if (file.size > 2 * 1024 * 1024)
        return reply(res, 413, {
          message: "Choose an image no larger than 2 MB.",
        });
      const bytes = Buffer.from(await file.arrayBuffer());
      let extension;
      if (
        file.type === "image/png" &&
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      )
        extension = "png";
      if (
        file.type === "image/jpeg" &&
        bytes[0] === 255 &&
        bytes[1] === 216 &&
        bytes[2] === 255
      )
        extension = "jpg";
      if (
        file.type === "image/webp" &&
        bytes.subarray(0, 4).toString() === "RIFF" &&
        bytes.subarray(8, 12).toString() === "WEBP"
      )
        extension = "webp";
      if (!extension)
        return reply(res, 415, {
          message: "Choose a PNG, JPEG or WebP image.",
        });
      await mkdir(uploads, { recursive: true });
      const name = randomUUID() + "." + extension;
      await writeFile(new URL(name, uploads), bytes);
      await delay(450);
      return reply(res, 201, { url: "/uploads/" + name });
    }
    if (
      req.method === "GET" &&
      /^\/uploads\/[a-f0-9-]+\.(png|jpg|webp)$/.test(url.pathname)
    ) {
      const name = url.pathname.split("/").at(-1);
      try {
        const bytes = await readFile(new URL(name, uploads));
        const mime = name.endsWith(".png")
          ? "image/png"
          : name.endsWith(".jpg")
            ? "image/jpeg"
            : "image/webp";
        res.writeHead(200, {
          "Content-Type": mime,
          "X-Content-Type-Options": "nosniff",
        });
        res.end(bytes);
        return;
      } catch {
        return reply(res, 404, { message: "Image not found." });
      }
    }
    reply(res, 404, { message: "Endpoint not found." });
  } catch (error) {
    reply(res, 400, {
      message: error instanceof Error ? error.message : "Request failed.",
    });
  }
});
app.listen(4087, "127.0.0.1", () =>
  console.log("Event Desk API: http://127.0.0.1:4087/api/health"),
);
