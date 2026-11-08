type MovieCardProps = {
  readonly title: string;
  readonly durationMinutes: number;
  readonly rating?: string;
};

export default function MovieCard(props: MovieCardProps) {
  props.title = 'Changed';
  return <article><h2>{props.title}</h2><p>{props.durationMinutes} minutes</p></article>;
}
