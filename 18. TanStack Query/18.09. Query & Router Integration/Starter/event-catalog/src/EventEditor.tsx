import { useMutation, useQueryClient, useIsMutating } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventKeys, eventOptions } from "./queries.ts";
import { renameEvent, setPublished } from "./api.ts";
import { eventEditSchema } from "./events.ts";
import type { EventItem } from "./events.ts";
export function EventEditor({ event, onRefresh, refreshing }: { event: EventItem; onRefresh: () => void; refreshing: boolean }) {
  const queryClient = useQueryClient();
  const writeKey = ["events", "write", event.id] as const;
  const activeWrites = useIsMutating({ mutationKey: writeKey, exact: true });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ title: string }>({
    resolver: zodResolver(eventEditSchema),
    defaultValues: { title: event.title },
  });
  const rename = useMutation({
    mutationKey: writeKey,
    mutationFn: (title: string) => renameEvent(event.id, title),
    retry: false,
    onSuccess: async (saved) => {
      await queryClient.cancelQueries({ queryKey: eventOptions(event.id).queryKey, exact: true });
      queryClient.setQueryData(eventOptions(event.id).queryKey, saved);
      reset({ title: saved.title });
      await queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
  const publication = useMutation({
    mutationKey: writeKey,
    mutationFn: (published: boolean) => setPublished(event.id, published),
    retry: false,
    onMutate: async (published) => {
      const key = eventOptions(event.id).queryKey;
      await queryClient.cancelQueries({ queryKey: key, exact: true });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, (old) => old ? { ...old, published } : old);
      return { previous };
    },
    onError: (_error, _published, result) => {
      if (result?.previous) queryClient.setQueryData(eventOptions(event.id).queryKey, result.previous);
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(eventOptions(event.id).queryKey, saved);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
  const busy = activeWrites > 0;
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
          <button className="primary" disabled={busy}>{rename.isPending ? "Saving…" : "Save title"}</button>
          <button type="button" className="secondary" disabled={busy || refreshing} onClick={onRefresh}>Refresh details</button>
        </div>
      </form>
      {rename.isError && (
        <p className="error" role="alert">{rename.error.message}</p>
      )}
      {rename.isSuccess && (
        <p className="success" role="status">Saved: {rename.data.title}.</p>
      )}
      <div className="publication">
        <h3>Publication</h3>
        <p>{event.published ? "Visible in the published series." : "This workshop is a draft."}</p>
        <button type="button" className="secondary" disabled={busy} onClick={() => publication.mutate(!event.published)}>
          {publication.isPending ? "Updating publication…" : event.published ? "Unpublish workshop" : "Publish workshop"}
        </button>
        {publication.isError && (
          <p className="error" role="alert">{publication.error.message}</p>
        )}
        {publication.isSuccess && (
          <p className="success" role="status">Publication saved.</p>
        )}
      </div>
    </section>
  );
}