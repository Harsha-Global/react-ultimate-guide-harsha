import { useId } from "react";
import { useFormStatus } from "react-dom";
type Props = {
  name: string;
  text: string;
  onNameChange: (value: string) => void;
  onTextChange: (value: string) => void;
};
export function ReviewFields({
  name,
  text,
  onNameChange,
  onTextChange,
}: Props) {
  const id = useId();
  const { pending } = useFormStatus();
  return (
    <fieldset disabled={pending} className="review-fields">
      <legend>Share your experience</legend>
      <div className="field">
        <label htmlFor={id + "-name"}>Your name</label>
        <input
          id={id + "-name"}
          name="reviewName"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
          minLength={2}
          maxLength={80}
        />
      </div>
      <div className="field">
        <label htmlFor={id + "-text"}>Your review</label>
        <textarea
          id={id + "-text"}
          name="reviewText"
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          required
          minLength={10}
          maxLength={500}
          aria-describedby={id + "-hint"}
        />
      </div>
      <p id={id + "-hint"} className="muted">
        10–500 characters. Please keep reviews free of links.
      </p>
      <button type="submit">
        {pending ? "Sending review…" : "Post review"}
      </button>
    </fieldset>
  );
}
