export const activity = Array.from({ length: 1000 }, (_, index) => ({
  id: `event-${index + 1}`,
  title: `Inventory review ${String(index + 1).padStart(4, "0")}`,
  detail: `Workspace ${(index % 4) + 1} · Review completed`,
}));
