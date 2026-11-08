import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventKeys, eventOptions } from "./queries.ts";
import { renameEvent } from "./api.ts";
import { eventEditSchema } from "./events.ts";
import type { EventItem } from "./events.ts";
export function EventEditor({ event, onRefresh, refreshing }: { event: EventItem; onRefresh: () => void; refreshing: boolean }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ title: string }>({
    resolver: zodResolver(eventEditSchema),
    defaultValues: { title: event.title },
  });
  const rename = useMutation({
    mutationFn: (title: string) => renameEvent(event.id, title),
    retry: false,
    onSuccess: async (saved) => {
      await queryClient.cancelQueries({ queryKey: eventOptions(event.id).queryKey, exact: true });
      queryClient.setQueryData(eventOptions(event.id).queryKey, saved);
      reset({ title: saved.title });
      await queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
  const busy = rename.isPending;
  return (
    <section className="editor" aria-label="Event editor">
      <h3>Edit this workshop</h3>
      <form noValidate onSubmit={handleSubmit((values) => rename.mutate(values.title))}>
        <div className="field">
          <label htmlFor="event-title">Workshop title</label>
          <input id="event-title" {...register("title", { onChange: () => rename.reset() })} readOnly={busy} aria-invalid={!!errors.title} aria-describedby={errors.title ? "title-error" : undefined} />
          {errors.title && (
            <p id="title-error" className="field-error" role="alert">{errors.title.message}</p>
          )}
        </div>
        <div className="actions">
          <button className="primary" disabled={busy}>{busy ? "Saving…" : "Save title"}</button>
          <button type="button" className="secondary" disabled={busy || refreshing} onClick={onRefresh}>Refresh details</button>
        </div>
      </form>
      {rename.isError && (
        <p className="error" role="alert">{rename.error.message}</p>
      )}
      {rename.isSuccess && (
        <p className="success" role="status">Saved: {rename.data.title}.</p>
      )}
    </section>
  );
}