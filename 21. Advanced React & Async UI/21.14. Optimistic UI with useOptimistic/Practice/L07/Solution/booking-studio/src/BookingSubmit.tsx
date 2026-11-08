import { useFormStatus } from "react-dom";
export function BookingSubmit({ completed }: { completed: boolean }) {
  const { pending, data } = useFormStatus();
  const submittedSlot = data?.get("slot");
  const sessionName =
    submittedSlot === "morning"
      ? "morning"
      : submittedSlot === "evening"
        ? "evening"
        : "selected";
  return (
    <>
      <button type="submit" disabled={pending || completed}>
        {pending
          ? "Saving your place…"
          : completed
            ? "Place confirmed"
            : "Book this session"}
      </button>
      {pending && (
        <p role="status">
          Waiting for the studio to confirm your {sessionName} place…
        </p>
      )}
    </>
  );
}
