import { flattenArrayDeep } from '~src/algorithms/flattenArrayDeep';

describe('flattenArrayDeep', () => {
  it('flattens a deeply nested array', () => {
    const input = [1, [2, [3, [4, [5]]]]];
    const output = [1, 2, 3, 4, 5];
    expect(flattenArrayDeep(input)).toEqual(output);
  });

  it('returns the same array if it is already flat', () => {
    const input = [1, 2, 3];
    const output = [1, 2, 3];
    expect(flattenArrayDeep(input)).toEqual(output);
  });

  it('flattens arrays with different types', () => {
    const input = [1, ['a', [true, [null, [{}, [undefined]]]]]];
    const output = [1, 'a', true, null, {}, undefined];
    expect(flattenArrayDeep(input)).toEqual(output);
  });

  it('flattens empty nested arrays', () => {
    const input = [1, [], [2, [], [3, []]]];
    const output = [1, 2, 3];
    expect(flattenArrayDeep(input)).toEqual(output);
  });

  it('returns empty array if input is empty', () => {
    expect(flattenArrayDeep([])).toEqual([]);
  });

  it('handles single element nested array', () => {
    expect(flattenArrayDeep([[[[42]]]])).toEqual([42]);
  });

  it('does not mutate the original array', () => {
    const input = [1, [2, [3]]];
    const copy = JSON.parse(JSON.stringify(input));
    flattenArrayDeep(input);
    expect(input).toEqual(copy);
  });

  it('throws if input is not an array (null)', () => {
    expect(() => flattenArrayDeep(null)).toThrow();
  });

  it('throws if input is not an array (number)', () => {
    expect(() => flattenArrayDeep(42)).toThrow();
  });

  it('throws if input is not an array (object)', () => {
    expect(() => flattenArrayDeep({ a: 1 })).toThrow();
  });
});
