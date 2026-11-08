import React, { useMemo, useState } from "react";
const initialMovies = [
    { id: "m1", title: "River Light", category: "Drama" },
    { id: "m2", title: "Forest Voices", category: "Documentary" },
    { id: "m3", title: "River Stories", category: "Documentary" },
    { id: "m4", title: "City Evening", category: "Drama" }
];
export default function App({ movies = initialMovies }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const filtered = useMemo(() => {
        const search = query.trim().toLowerCase();
        return movies.filter(movie => movie.title.toLowerCase().includes(search) && (category === "All" || movie.category === category));
    }, [movies]);
    return <main><h1>Find a film</h1><label>Search title<input value={query} onChange={event => setQuery(event.target.value)}/></label><label>Category<select value={category} onChange={event => setCategory(event.target.value)}><option>All</option><option>Drama</option><option>Documentary</option></select></label><p role="status">{filtered.length} films</p><ul aria-label="Matching films">{filtered.map(movie => <li key={movie.id}>{movie.title}</li>)}</ul></main>;
}
