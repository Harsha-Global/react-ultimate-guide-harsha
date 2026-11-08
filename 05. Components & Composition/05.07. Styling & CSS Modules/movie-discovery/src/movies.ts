import skywardPoster from './assets/skyward.svg';
import nightSignalsPoster from './assets/night-signals.svg';
import type { Movie } from './types.ts';

export const movies: Movie[] = [
  { id: 'm1', title: 'Skyward', durationMinutes: 125, rating: 'PG', isAvailable: true, poster: skywardPoster },
  { id: 'm2', title: 'Night Signals', durationMinutes: 98, isAvailable: false, poster: nightSignalsPoster },
];
