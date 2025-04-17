import { mergeDeep } from '~src/algorithms/mergeDeep';

describe('mergeDeep', () => {
  it('merges shallow objects', () => {
    const a = { foo: 1, bar: 2 };
    const b = { bar: 3, baz: 4 };
    expect(mergeDeep(a, b)).toEqual({ foo: 1, bar: 3, baz: 4 });
  });

  it('merges deeply nested objects', () => {
    const a = { user: { name: 'Alice', meta: { age: 30 } } };
    const b = { user: { meta: { age: 35, active: true } } };
    expect(mergeDeep(a, b)).toEqual({
      user: { name: 'Alice', meta: { age: 35, active: true } },
    });
  });

  it('overrides primitives with objects', () => {
    const a = { value: 42 };
    const b = { value: { inner: true } };
    expect(mergeDeep(a, b)).toEqual({ value: { inner: true } });
  });

  it('overrides objects with primitives', () => {
    const a = { value: { inner: true } };
    const b = { value: 42 };
    expect(mergeDeep(a, b)).toEqual({ value: 42 });
  });

  it('adds new keys from b if missing in a', () => {
    const a = { a: 1 };
    const b = { b: 2 };
    expect(mergeDeep(a, b)).toEqual({ a: 1, b: 2 });
  });

  // it('merges arrays as plain overrides (not deep merge)', () => {
  //   const a = { list: [1, 2, 3] };
  //   const b = { list: [4, 5] };
  //   expect(mergeDeep(a, b)).toEqual({ list: [4, 5] }); // not concatenated
  // });

  it('works when a is empty', () => {
    expect(mergeDeep({}, { x: 1 })).toEqual({ x: 1 });
  });

  it('works when b is empty', () => {
    expect(mergeDeep({ x: 1 }, {})).toEqual({ x: 1 });
  });

  it('works when both are empty', () => {
    expect(mergeDeep({}, {})).toEqual({});
  });

  it('does not mutate original objects', () => {
    const a = { user: { name: 'Alice' } };
    const b = { user: { age: 30 } };
    const result = mergeDeep(a, b);
    expect(result).not.toBe(a);
    expect(result).not.toBe(b);
    expect(result.user).not.toBe(a.user);
  });

  // it('merges symbols and non-enumerable properties correctly', () => {
  //   const sym = Symbol('secret');
  //   const a = {};
  //   Object.defineProperty(a, sym, { value: 42, enumerable: true });

  //   const b = {};
  //   Object.defineProperty(b, sym, { value: 100, enumerable: true });

  //   const merged = mergeDeep(a, b);
  //   expect(merged[sym]).toBe(100);
  // });
});
