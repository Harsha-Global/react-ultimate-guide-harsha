import { measureInteraction } from "./measurements";
export function NoteEditor({ note, onNoteChange }: { note: string; onNoteChange: (note: string) => void }) {
  return (
    <section className="evening-note">
      <div>
        <p className="eyebrow">A LITTLE PLAN</p>
        <label htmlFor="note">Note for tonight</label>
      </div>
      <input
        id="note"
        maxLength={120}
        value={note}
        placeholder="A quiet film and something warm"
        onChange={(event) => {
          measureInteraction("Edit evening note");
          onNoteChange(event.target.value);
        }}
      />
      <span>{note.length}/120</span>
    </section>
  );
}
