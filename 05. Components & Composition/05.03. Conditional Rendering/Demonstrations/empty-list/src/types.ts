export type Movie = {
  readonly id: string;
  readonly title: string;
  readonly durationMinutes: number;
  readonly rating?: string;
  readonly isAvailable: boolean;
};
