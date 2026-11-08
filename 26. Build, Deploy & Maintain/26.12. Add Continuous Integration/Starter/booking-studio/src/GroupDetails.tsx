import { useId } from "react";
import type { GroupBooking } from "./bookingTypes";

type Props = {
  mode: "edit";
  booking: GroupBooking;
  onChange: (booking: GroupBooking) => void;
} | {
  mode: "review";
  booking: GroupBooking;
  onChange?: never;
};

export function GroupDetails(props: Props) {
  const id = useId();
  if (props.mode === "review")
    return <section className="contract-review">
      <h3>{props.booking.groupName || "Your group"}</h3>
      <ul>
        {props.booking.attendees.map(attendee => <li key={attendee.id}>{attendee.name || "Name not entered"}</li>)}
      </ul>
    </section>;

  return <div>
    <label htmlFor={id}>Group name</label>
    <input id={id} value={props.booking.groupName} onChange={event => props.onChange({ ...props.booking, groupName: event.target.value })} />
    <ul className="attendees">
      {props.booking.attendees.map(attendee => <li key={attendee.id}>
        <label htmlFor={id + attendee.id}>Attendee name
          <input id={id + attendee.id} value={attendee.name} onChange={event => props.onChange({
            ...props.booking,
            attendees: props.booking.attendees.map(item => item.id === attendee.id ? { ...item, name: event.target.value } : item),
          })} />
        </label>
      </li>)}
    </ul>
  </div>;
}