export type FocusTask = Readonly<{
  id: string;
  title: string;
  done: boolean;
}>;

export const initialTasks: FocusTask[] = [
  { id: "outline", title: "Outline the presentation", done: false },
  { id: "slides", title: "Build the first three slides", done: false },
  { id: "review", title: "Review the draft", done: true },
];
