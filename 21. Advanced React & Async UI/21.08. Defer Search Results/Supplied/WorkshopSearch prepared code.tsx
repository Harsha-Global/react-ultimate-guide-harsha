const workshops = [
  "Clay & Colour",
  "Sunday Wheel",
  "Glaze Lab",
  "Botanical Tiles",
  "Handmade Mugs",
  "Porcelain Stories",
  "Evening Sculptures",
  "Weekend Bowls",
];
const SearchResults = memo(function SearchResults({
  query,
}: {
  query: string;
}) {
  const matches = workshops.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return matches.length ? (
    <ul className="workshop-results">
      {matches.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  ) : (
    <p>No workshops match that search.</p>
  );
});
