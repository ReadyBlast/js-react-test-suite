import { promiseAllLimit } from '~src/promises/promiseAllLimit'; 

describe('promiseAllLimit', () => {
  it('should resolve all promises with correct results (no errors)', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ];
    const result = await promiseAllLimit(tasks, 2); // limit=2
    expect(result).toEqual([1, 2, 3]);
  });

  it('should reject if any task rejects', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Failed')),
      () => Promise.resolve(3),
    ];
    await expect(promiseAllLimit(tasks, 2)).rejects.toThrow('Failed');
  });

  it('should respect the limit for parallel tasks', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 300)),
      () => new Promise((resolve) => setTimeout(() => resolve(4), 400)),
    ];
    const start = Date.now();
    await promiseAllLimit(tasks, 2); // limit=2
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(400); // at least 400ms
    expect(duration).toBeLessThan(700); // less than 700ms
  });

  it('should work with empty tasks', async () => {
    const tasks = [];
    const result = await promiseAllLimit(tasks, 2);
    expect(result).toEqual([]);
  });

  it('should resolve when only one task is provided', async () => {
    const tasks = [() => Promise.resolve(1)];
    const result = await promiseAllLimit(tasks, 2);
    expect(result).toEqual([1]);
  });

  it('should resolve with tasks in correct order', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 300)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 200)),
    ];
    const result = await promiseAllLimit(tasks, 2); // limit=2
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle different task durations correctly', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 500)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 300)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 100)),
    ];
    const start = Date.now();
    const result = await promiseAllLimit(tasks, 1); // limit=1
    const duration = Date.now() - start;
    expect(result).toEqual([1, 2, 3]);
    expect(duration).toBeGreaterThanOrEqual(900); // at least 900ms
  });

  it('should allow different limits for parallel tasks', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 300)),
    ];
    const start = Date.now();
    await promiseAllLimit(tasks, 1); // limit=1
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(600); // at least 600ms
    expect(duration).toBeLessThan(700); // less than 700ms
  });

  it('should handle promise that resolves immediately', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ];
    const result = await promiseAllLimit(tasks, 1);
    expect(result).toEqual([1, 2, 3]);
  });

  // it('should handle mix of promises and non-promises (non-promise should resolve immediately)', async () => {
  //   const tasks = [() => 1, () => Promise.resolve(2), () => 3];
  //   const result = await promiseAllLimit(tasks, 2);
  //   expect(result).toEqual([1, 2, 3]);
  // });
});