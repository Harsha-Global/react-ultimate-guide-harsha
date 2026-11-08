import type { Slot } from "./slots";

export type SessionChoice = {
  id: Slot;
  label: string;
  time: string;
};

export const sessionChoices: SessionChoice[] = [
  { id: "morning", label: "Morning", time: "10:00 – 12:00" },
  { id: "evening", label: "Evening", time: "17:00 – 19:00" },
];

export type GroupTemplate = {
  id: string;
  title: string;
  places: number;
};

export const groupTemplates: GroupTemplate[] = [
  { id: "pair", title: "Two friends", places: 2 },
  { id: "four", title: "Four friends", places: 4 },
];