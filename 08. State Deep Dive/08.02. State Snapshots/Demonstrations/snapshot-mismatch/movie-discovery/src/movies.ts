import skywardPoster from './assets/skyward.svg';
import nightSignalsPoster from './assets/night-signals.svg';
import type { Movie } from './types.ts';

export const movies: Movie[] = [
  { id: 'm1', title: 'Skyward', durationMinutes: 125, rating: 'PG', isAvailable: true, poster: skywardPoster, synopsis: 'A pilot follows an unexpected route through the mountains.' },
  { id: 'm2', title: 'Night Signals', durationMinutes: 98, isAvailable: false, poster: nightSignalsPoster, synopsis: 'Two neighbors trace a mysterious signal across their city.' },
];
