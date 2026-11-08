import { findEvent } from "./events.ts";
import type { BasketAction, BasketState } from "./models.ts";

export const initialBasket: BasketState = { lines: [] };

export function basketReducer(
  state: BasketState,
  action: BasketAction,
): BasketState {
  switch (action.type) {
    case "ticketAdded": {
      const event = findEvent(action.eventId);
      if (!event) return state;

      const line = state.lines.find((item) => item.eventId === action.eventId);
      if (line && line.quantity >= event.maxTickets) return state;

      const lines = line
        ? state.lines.map((item) =>
            item.eventId === action.eventId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
        )
        : [...state.lines, { eventId: action.eventId, quantity: 1 }];

      return { ...state, lines };
    }

    case "quantityChanged": {
      const event = findEvent(action.eventId);
      const line = state.lines.find((item) => item.eventId === action.eventId);

      if (
        !event ||
        !line ||
        !Number.isInteger(action.quantity) ||
        action.quantity < 1 ||
        action.quantity > event.maxTickets ||
        line.quantity === action.quantity
      )
        return state;

      return {
        ...state,
        lines: state.lines.map((item) =>
          item.eventId === action.eventId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    }

    case "ticketRemoved": {
      const lines = state.lines.filter(
        (item) => item.eventId !== action.eventId,
      );
      return lines.length === state.lines.length ? state : { ...state, lines };
    }

    case "basketCleared":
      return state.lines.length === 0 ? state : { ...state, lines: [] };

    default: {
      const unhandled: never = action;
      throw new Error(`Unhandled basket action: ${String(unhandled)}`);
    }
  }
}
