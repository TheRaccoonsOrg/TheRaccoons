import { subscribeToNewsletter } from '@/actions/subscribeToNewsletter';

// Mock the fetch function
const globalAny = global as unknown as { fetch: jest.Mock };
globalAny.fetch = jest.fn();

describe('subscribeToNewsletter', () => {
  const mockUrl = 'https://mockapi.com/api/public/subscription';
  const originalEnv = process.env;

  beforeEach(() => {
    globalAny.fetch.mockClear();
    process.env = { ...originalEnv, NEXT_PUBLIC_LISTMONK_API_URL: 'https://mockapi.com' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns success true when response is ok', async () => {
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
    });

    const result = await subscribeToNewsletter({ email: 'test@example.com' });
    expect(result).toEqual({ success: true });
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${mockUrl}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      }),
    );
  });

  it('returns success false when response is not ok', async () => {
    globalAny.fetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await subscribeToNewsletter({ email: 'test@example.com' });
    expect(result).toEqual({ success: false });
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${mockUrl}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      }),
    );
  });

  it('returns success false when there is a fetch error', async () => {
    globalAny.fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await subscribeToNewsletter({ email: 'test@example.com' });
    expect(result).toEqual({ success: false });
    expect(globalAny.fetch).toHaveBeenCalledWith(
      `${mockUrl}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      }),
    );
  });
});
