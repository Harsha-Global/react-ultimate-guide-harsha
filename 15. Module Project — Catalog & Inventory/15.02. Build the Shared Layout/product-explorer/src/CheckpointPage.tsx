export default function CheckpointPage({ title }: { title: string }) {
  return (
    <section className="empty-state">
      <h1 tabIndex={-1}>{title}</h1>
      <p>This view will be connected in the following project steps.</p>
    </section>
  );
}
