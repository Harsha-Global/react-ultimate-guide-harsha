import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
const shortlist = createSlice({ name: 'shortlist', initialState: [] as string[], reducers: {
 toggle: (state, action: PayloadAction<string>) => state.includes(action.payload) ? state.filter(id => id !== action.payload) : [...state, action.payload],
} });
export const { toggle } = shortlist.actions;
export function makeShortlistStore(initialIds: string[] = []) {
 return configureStore({ reducer: { ids: shortlist.reducer }, preloadedState: { ids: [...initialIds] } });
}
export type ShortlistStore = ReturnType<typeof makeShortlistStore>;
export type ShortlistState = ReturnType<ShortlistStore['getState']>;
