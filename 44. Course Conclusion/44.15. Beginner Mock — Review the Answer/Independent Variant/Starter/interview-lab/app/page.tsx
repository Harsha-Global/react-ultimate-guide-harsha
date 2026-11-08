"use client";
import {useState} from 'react';
import {attendees} from './attendees';
import {Row} from './Row';
export default function Page() {
 
 const [descending,setDescending]=useState(false);
 const [hideFirst,setHideFirst]=useState(false);
 const [removed,setRemoved]=useState(false);
 const visible=attendees.filter(a=>(!removed||a.id!=='a-1')&&(!hideFirst||a.id!=='a-1')).toSorted((a,b)=>descending?b.id.localeCompare(a.id):a.id.localeCompare(b.id));
 function remove(){setRemoved(true);}
 return <><h1>Workshop attendees</h1><p>Names may repeat. Drafts belong to stable attendee IDs. Filtering preserves a draft; permanent removal discards it. Reload restores this local sample.</p><button onClick={()=>setDescending(v=>!v)}>Reverse sort</button><button onClick={()=>setHideFirst(v=>!v)}>{hideFirst?'Show first attendee':'Hide first attendee'}</button><button onClick={remove} disabled={removed}>Permanently remove a-1</button><ul className="rows">{visible.map((attendee,index)=><Row key={index} attendee={attendee}/>)}</ul></>;
}
