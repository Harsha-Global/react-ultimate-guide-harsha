import { validateCustomer } from "./validation";
import type { CustomerDraft } from "./validation";
const valid: CustomerDraft = { fullName: "Emily Carter", email: "emily@example.com", city: "Seattle", arrivalMinutes: "15", note: "", updates: false, seating: "aisle" };
const cases: [string, Partial<CustomerDraft>, string | null][] = [
 ["valid draft", {}, null], ["whitespace name", { fullName: "   " }, "fullName"],
 ["missing email", { email: "" }, "email"], ["invalid email", { email: "emily" }, "email"],
 ["empty minutes", { arrivalMinutes: "" }, "arrivalMinutes"], ["zero minutes", { arrivalMinutes: "0" }, null],
 ["upper bound", { arrivalMinutes: "60" }, null], ["over limit", { arrivalMinutes: "61" }, "arrivalMinutes"],
 ["fraction", { arrivalMinutes: "1.5" }, "arrivalMinutes"], ["negative", { arrivalMinutes: "-1" }, "arrivalMinutes"],
 ["not a number", { arrivalMinutes: "hello" }, "arrivalMinutes"], ["long note", { note: "x".repeat(201) }, "note"],
 ["boundary note", { note: "x".repeat(200) }, null]
];
let failures = 0;
for (const [name, changes, field] of cases) {
 const draft = Object.freeze({ ...valid, ...changes }); const before = JSON.stringify(draft);
 const result = validateCustomer(draft);
 const pass = (field === null ? Object.keys(result).length === 0 : typeof result[field as keyof typeof result] === "string") && JSON.stringify(draft) === before;
 console.log(`${pass ? "PASS" : "FAIL"}: ${name}`); if (!pass) failures++;
}
const multiple = validateCustomer({ ...valid, fullName: "", email: "", arrivalMinutes: "" });
if (!multiple.fullName || !multiple.email || !multiple.arrivalMinutes) { failures++; console.log("FAIL: report all invalid fields together"); }
if (failures) throw new Error(`${failures} validation checks failed`);
