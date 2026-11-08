export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  minutes: number;
  poster: string;
  seed: number;
};
const beginnings = [
  "Amber",
  "Paper",
  "Velvet",
  "Silver",
  "Midnight",
  "Quiet",
  "Golden",
  "Hidden",
  "Electric",
  "Distant",
  "Little",
  "Summer",
];
const endings = [
  "Orbit",
  "Garden",
  "City",
  "Letters",
  "Harbour",
  "Road",
  "River",
  "Morning",
  "Echoes",
  "House",
  "Horizon",
  "Window",
  "Waltz",
  "Tide",
  "Station",
  "Dreams",
  "Moon",
  "Festival",
  "Bridge",
  "Portrait",
  "Valley",
  "Stars",
  "Island",
  "Room",
  "Journey",
  "Light",
  "Clouds",
  "Forest",
  "Signal",
  "Story",
  "Daybreak",
  "Atlas",
  "Circle",
  "Meadow",
  "Rooftops",
  "Oceans",
  "Rhythm",
  "Adventure",
  "Passage",
  "Sky",
];
export const movies: Movie[] = beginnings.flatMap((word, i) =>
  endings.map((ending, j) => {
    const n = i * endings.length + j;
    return {
      id: `film-${n + 1}`,
      title: `${word} ${ending}`,
      genre: ["Drama", "Adventure", "Comedy", "Sci-fi"][n % 4],
      year: 2016 + (n % 11),
      minutes: 88 + (n % 49),
      poster: `/posters/poster-${(n % 12) + 1}.svg`,
      seed: n + 1,
    };
  }),
);
export type SortOrder = "match" | "title";
export type RankedMovie = { movie: Movie; score: number };
// A deterministic, deliberately costly teaching workload. It models scoring work,
// not a real recommendation algorithm. Keep it unchanged for before/after comparisons.
export function rankMovies(query: string, sort: SortOrder): RankedMovie[] {
  const needle = query.trim().toLowerCase();
  const ranked = movies
    .filter((movie) => movie.title.toLowerCase().includes(needle))
    .map((movie) => {
      let total = 0;
      for (let sample = 1; sample <= 120000; sample++)
        total += Math.sqrt(((sample * movie.seed) % 997) + 1);
      return {
        movie,
        score: Math.round(
          (total / 120000 / Math.sqrt(997)) * 70 + (movie.seed % 31),
        ),
      };
    });
  return ranked.sort(
    sort === "title"
      ? (a, b) => a.movie.title.localeCompare(b.movie.title)
      : (a, b) =>
          b.score - a.score || a.movie.title.localeCompare(b.movie.title),
  );
}
