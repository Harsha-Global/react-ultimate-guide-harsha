import type { BookingConfirmation, BookingRequest } from "../shared/bookingSchema";
export const requestId = "11111111-1111-4111-8111-111111111111";
export const reference = "22222222-2222-4222-8222-222222222222";
export const individual: BookingRequest = {
  kind: "individual", name: "Alex Morgan", email: "alex@example.com", slot: "morning", requestId,
};
export const confirmation: BookingConfirmation = {
  reference, kind: "individual", name: "Alex Morgan", slot: "morning", places: 1,
};
