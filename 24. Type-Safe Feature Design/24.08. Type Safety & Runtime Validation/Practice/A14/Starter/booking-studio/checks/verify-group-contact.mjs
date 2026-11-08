import assert from "node:assert/strict";
import { bookingRequestSchema } from "../shared/bookingSchema.ts";
const base = "http://127.0.0.1:4318/api";
const common = {name:"Maya",email:"maya@example.com",slot:"morning",requestId:crypto.randomUUID()};
const group = {...common,kind:"group",groupName:"Saturday Friends",attendees:[{id:crypto.randomUUID(),name:"Maya"},{id:crypto.randomUUID(),name:"Sam"}]};
let count=0;function check(label,condition){assert.ok(condition,label);console.log("PASS:",label);count++;}
for(const phone of [undefined,"","   ","abc1234567","123456","1234567890123456"]){check("reject invalid group phone: "+String(phone),!bookingRequestSchema.safeParse({...group,phone}).success);}
for(const phone of ["1234567","+44 7700 900123","(020) 7946-0123","123456789012345"]){check("accept allowed group phone: "+phone,bookingRequestSchema.safeParse({...group,phone}).success);}
check("individual booking still needs no phone",bookingRequestSchema.safeParse({...common,kind:"individual"}).success);
await fetch(base+"/reset",{method:"POST"});
async function send(value){const response=await fetch(base+"/typed-bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(value)});return {status:response.status,value:await response.json()};}
const invalid=await send(group);check("API rejects missing group phone",invalid.status===422);check("API identifies the phone field",typeof invalid.value.fieldErrors?.phone==="string");
const valid=await send({...group,phone:"+44 7700 900123"});check("valid group books two places",valid.status===201&&valid.value.places===2);
const repeated=await send({...group,phone:"+44 7700 900123"});check("same accepted request returns original booking",repeated.status===200&&repeated.value.reference===valid.value.reference);
const summary=await fetch(base+"/typed-bookings/"+valid.value.reference).then(r=>r.json());check("public summary omits contact phone",!("phone" in summary));
const individual=await send({...common,kind:"individual",requestId:crypto.randomUUID()});check("API accepts individual without phone",individual.status===201&&individual.value.places===1);
console.log(count+" group-contact checks passed.");
