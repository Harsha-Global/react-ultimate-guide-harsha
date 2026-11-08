export type Guest = {
  readonly name: string;
  readonly contact: { readonly city: string; readonly email: string };
};
export function createGuest(): Guest {
  return { name: '', contact: { city: 'Seattle', email: '' } };
}
export function changeCity(guest: Guest, city: string): Guest {
  return { ...guest, contact: { ...guest.contact, city } };
}
