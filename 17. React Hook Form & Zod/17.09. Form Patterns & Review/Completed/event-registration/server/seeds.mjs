export const seeds = [
  {
    id: "a1",
    values: {
      fullName: "Alex Morgan",
      email: "alex@example.com",
      ticketCount: "2",
      attendance: "in-person",
      session: "morning",
      contact: { city: "Denver" },
      guests: [{ name: "Jordan Lee" }],
      avatarUrl: "",
      acceptTerms: true,
    },
  },
  {
    id: "a2",
    values: {
      fullName: "Casey Park",
      email: "casey@example.com",
      ticketCount: "1",
      attendance: "online",
      session: "afternoon",
      contact: { city: "" },
      guests: [],
      avatarUrl: "",
      acceptTerms: true,
    },
  },
];
