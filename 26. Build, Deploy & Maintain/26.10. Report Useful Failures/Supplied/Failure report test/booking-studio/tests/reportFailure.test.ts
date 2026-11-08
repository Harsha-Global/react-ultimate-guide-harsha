import { expect, test, vi } from 'vitest';
import { reportFailure } from '../src/reportFailure';
test('reports only the known event fields', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
        reportFailure('booking-request');
        expect(log).toHaveBeenCalledTimes(1);
        expect(log.mock.calls[0]).toEqual([{ event: 'studio-failure', location: 'booking-request', release: 'Local preview' }]);
    } finally { log.mockRestore(); }
});
