export const fulfillmentFilters = ['all', 'awaiting', 'ready', 'dispatched'] as const;
export type FulfillmentFilter = typeof fulfillmentFilters[number];
export function readFulfillmentFilter(value: string | string[] | undefined): FulfillmentFilter {
  return typeof value === 'string' && fulfillmentFilters.includes(value as FulfillmentFilter)
    ? value as FulfillmentFilter : 'all';
}
