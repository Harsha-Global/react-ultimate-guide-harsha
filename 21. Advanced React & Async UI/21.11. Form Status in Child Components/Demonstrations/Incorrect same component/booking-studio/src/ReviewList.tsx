const reviews = [
  {
    id: "r1",
    name: "Maya",
    text: "A calm afternoon, with plenty of room to try things out.",
  },
  {
    id: "r2",
    name: "Sam",
    text: "I arrived with no experience and left with a bowl I made myself.",
  },
];
export default function ReviewList() {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li className="review" key={review.id}>
          <strong>{review.name}</strong>
          <p>{review.text}</p>
        </li>
      ))}
    </ul>
  );
}
