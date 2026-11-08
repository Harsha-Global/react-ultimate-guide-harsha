import type { Quote } from './Quote';
export type QuoteState =
  | { readonly status: 'idle' }
  | { readonly status: 'preparing' }
  | { readonly status: 'ready'; readonly quote: Quote };
