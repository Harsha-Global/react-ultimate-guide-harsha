import type { Attendee } from './attendees';
export function Row({attendee,draft,onChange}: {attendee:Attendee;draft:string;onChange:(value:string)=>void}) {
 return <li><strong>{attendee.name}</strong><label>Name draft for {attendee.id}<input value={draft} onChange={e=>onChange(e.target.value)}/></label><span>Attendee ID: {attendee.id}</span></li>;
}
