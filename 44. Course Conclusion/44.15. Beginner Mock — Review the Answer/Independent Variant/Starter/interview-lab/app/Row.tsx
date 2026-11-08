import {useState} from 'react';
import type {Attendee} from './attendees';
export function Row({attendee}:{attendee:Attendee}) {
 const [draft,setDraft]=useState(attendee.name);
 return <li><strong>{attendee.name}</strong><label>Name draft for {attendee.id}<input value={draft} onChange={e=>setDraft(e.target.value)}/></label><span>Attendee ID: {attendee.id}</span></li>;
}
