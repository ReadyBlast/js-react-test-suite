import { retryWithBackoff } from '~src/promises/retryWithBackoff';

// jest.useFakeTimers();

test('retries until success', async () => {
  let count = 0;
  const fn = jest.fn(() => {
    count++;
    if (count < 3) return Promise.reject('fail');
    return Promise.resolve('done');
  });
  const result = await retryWithBackoff(fn, 5, 10);
  expect(result).toBe('done');
});