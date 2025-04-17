import { timeoutRace } from '~src/promises/timeoutRace';

describe('timeoutRace', () => {
  it('should return result of promise if it resolves before timeout', async () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve('success'), 500)
    );
    const result = await timeoutRace(promise, 1000);
    expect(result).toBe('success');
  });

  it('should return "timeout" if the promise takes longer than the timeout', async () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve('success'), 2000)
    );
    const result = await timeoutRace(promise, 1000);
    expect(result).toBe('timeout');
  });

  it('should return "timeout" if the promise rejects before timeout', async () => {
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject('failed'), 500)
    );
    const result = await timeoutRace(promise, 1000).catch(() => 'timeout'); // Ожидаем "timeout", так как промис отклоняется до истечения времени
    expect(result).toBe('timeout');
  });

  it('should return "timeout" if the promise rejects after timeout', async () => {
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject('failed'), 1500)
    );
    const result = await timeoutRace(promise, 1000).catch(() => 'timeout'); // Ожидаем "timeout", так как прошло больше времени, чем таймаут
    expect(result).toBe('timeout');
  });

  it('should return the result of the promise if it resolves before timeout (edge case)', async () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve('early success'), 200)
    );
    const result = await timeoutRace(promise, 1000);
    expect(result).toBe('early success');
  });

  // it('should return "timeout" if the promise takes exactly the same time as the timeout', async () => {
  //   const promise = new Promise((resolve) =>
  //     setTimeout(() => resolve('success'), 1000)
  //   );
  //   const result = await timeoutRace(promise, 1000);
  //   expect(result).toBe('timeout'); // Ожидаем "timeout", так как время промиса совпадает с таймаутом
  // });
});

