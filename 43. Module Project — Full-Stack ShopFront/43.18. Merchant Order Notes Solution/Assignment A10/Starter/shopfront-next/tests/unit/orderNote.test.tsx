import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OrderNoteEditor } from '@/components/OrderNoteEditor';
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
test('keeps the typed note available after failure and permits an explicit retry', async () => {
  const request = vi.fn().mockRejectedValueOnce(new TypeError('Controlled network failure'))
    .mockResolvedValueOnce(Response.json({ note: 'Leave at reception.' }));
  vi.stubGlobal('fetch', request);
  render(<OrderNoteEditor id="O-1001" note=""/>);
  const field = screen.getByRole('textbox', { name: 'Order note' }) as HTMLTextAreaElement;
  fireEvent.change(field, { target: { value: 'Leave at reception.' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
  await waitFor(() => expect(screen.getByRole('status').textContent).toContain('not confirmed'));
  expect(field.value).toBe('Leave at reception.');
  fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
  await waitFor(() => expect(screen.getByRole('status').textContent).toBe('Note saved.'));
  expect(request).toHaveBeenCalledTimes(2);
  expect(request.mock.calls[1][1].body).toBe(JSON.stringify({ note: 'Leave at reception.' }));
});
