'use client';
import { useState, type ReactNode } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { makeShortlistStore, toggle, type ShortlistStore, type ShortlistState } from '@/lib/shortlistStore';
export function ShortlistProvider({ children, initialIds = [] }: { children: ReactNode; initialIds?: string[] }) {
 const [store] = useState(() => makeShortlistStore(initialIds));
 return <Provider store={store}>{children}</Provider>;
}
export function useShortlist() {
 const ids = useSelector((state: ShortlistState) => state.ids);
 const dispatch = useDispatch<ShortlistStore['dispatch']>();
 return { ids, toggle: (id: string) => dispatch(toggle(id)) };
}
