export type Line = { id: string; quantity: number };
export type Action =
  | { type: "remove"; id: string }
  | { type: "quantityChanged"; id: string; quantity: number };
export function reducer(state: Line[], action: Action): Line[] {
  switch (action.type) {
    case "remove":
      return state.filter((line) => line.id !== action.id);
    case "quantityChanged":
      if (
        !Number.isInteger(action.quantity) ||
        action.quantity < 1 ||
        action.quantity > 4
      )
        return state;
      if (
        !state.some(
          (line) => line.id === action.id && line.quantity !== action.quantity,
        )
      )
        return state;
      return state.map((line) =>
        line.id === action.id ? { ...line, quantity: action.quantity } : line,
      );
  }
}
