export type Line = { id: string; quantity: number };
export type Action =
  | { type: "remove"; id: string }
  | { type: "quantityChanged"; id: string; quantity: number };
export function reducer(state: Line[], action: Action): Line[] {
  switch (action.type) {
    case "remove":
      return state.filter((line) => line.id !== action.id);
    case "quantityChanged":
      // TODO: return new state only for an existing id and an integer quantity from 1 to 4.
      return state;
  }
}
