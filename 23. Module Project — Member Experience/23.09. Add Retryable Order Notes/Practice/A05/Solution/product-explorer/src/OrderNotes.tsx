import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { useAuth } from "./Auth";
import { ApiError } from "./sessionApi";
import { saveOrderNote } from "./orderApi";
import { queryClient } from "./queryClient";
import { ordersOptions } from "./orderQueries";
type NoteState = {
    status: "idle" | "error" | "saved";
    message: string;
};
const initialState: NoteState = { status: "idle", message: "" };
export function OrderNotes({ orderId, userId, savedNote }: {
    orderId: string;
    userId: string;
    savedNote: string;
}) {
    const id = useId();
    const [text, setText] = useState(savedNote);
    const { getVersion, expireIfCurrent } = useAuth();
    async function save(_previous: NoteState, formData: FormData): Promise<NoteState> {
        const draft = String(formData.get("note") ?? "").trim();
        if (!draft || draft.length > 120)
            return { status: "error", message: "Use a note from 1 to 120 characters." };
        const version = getVersion();
        try {
            const order = await saveOrderNote(orderId, draft, userId);
            if (version !== getVersion())
                return initialState;
            queryClient.setQueryData(ordersOptions(userId).queryKey, (current) => current?.map(item => item.id === order.id ? order : item));
            return { status: "saved", message: "Your note was saved." };
        }
        catch (error) {
            if (error instanceof ApiError && error.status === 401)
                expireIfCurrent(version);
            return { status: "error", message: error instanceof Error ? error.message : "The note was not saved. Try again." };
        }
    }
    const [state, formAction, isPending] = useActionState(save, initialState);
    return <form action={formAction} aria-busy={isPending}><label htmlFor={id}>Order note</label><textarea id={id} name="note" value={text} onChange={event => setText(event.target.value)} maxLength={120} disabled={isPending} aria-describedby={state.message ? id + "-message" : undefined}/><NoteSubmit />{state.message && !isPending && <p id={id + "-message"} role={state.status === "error" ? "alert" : "status"}>{state.message}</p>}</form>;
}
function NoteSubmit() { const { pending } = useFormStatus(); return <button disabled={pending} type="submit">{pending ? "Saving note…" : "Save note"}</button>; }
