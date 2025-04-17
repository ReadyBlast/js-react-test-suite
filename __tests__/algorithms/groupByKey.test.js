import { groupByKey } from '~src/algorithms/groupByKey'; 

describe('groupByKey', () => {
  it('groups objects by a common string key', () => {
    const arr = [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
      { type: 'vegetable', name: 'carrot' },
    ];
    const grouped = groupByKey(arr, 'type');
    expect(grouped).toEqual({
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' },
      ],
      vegetable: [{ type: 'vegetable', name: 'carrot' }],
    });
  });

  it('handles grouping by numeric key', () => {
    const arr = [
      { age: 30, name: 'Alice' },
      { age: 40, name: 'Bob' },
      { age: 30, name: 'Charlie' },
    ];
    const grouped = groupByKey(arr, 'age');
    expect(grouped).toEqual({
      30: [
        { age: 30, name: 'Alice' },
        { age: 30, name: 'Charlie' },
      ],
      40: [{ age: 40, name: 'Bob' }],
    });
  });

  it('handles empty array input', () => {
    expect(groupByKey([], 'category')).toEqual({});
  });

  it('groups even if some keys are missing', () => {
    const arr = [
      { type: 'a', value: 1 },
      { value: 2 },
      { type: 'a', value: 3 },
      { type: 'b', value: 4 },
    ];
    const grouped = groupByKey(arr, 'type');
    expect(grouped).toEqual({
      a: [
        { type: 'a', value: 1 },
        { type: 'a', value: 3 },
      ],
      b: [{ type: 'b', value: 4 }],
      undefined: [{ value: 2 }],
    });
  });

  it('handles null and undefined key values', () => {
    const arr = [
      { group: null, name: 'NullOne' },
      { name: 'NoGroup' },
      { group: undefined, name: 'UndefOne' },
    ];
    const grouped = groupByKey(arr, 'group');
    expect(grouped).toEqual({
      null: [{ group: null, name: 'NullOne' }],
      undefined: [{ name: 'NoGroup' }, { group: undefined, name: 'UndefOne' }],
    });
  });

  it('does not mutate the original array', () => {
    const arr = [
      { type: 'x', id: 1 },
      { type: 'y', id: 2 },
    ];
    const copy = JSON.stringify(arr);
    groupByKey(arr, 'type');
    expect(JSON.stringify(arr)).toBe(copy);
  });

  it('throws if first argument is not an array', () => {
    expect(() => groupByKey(null, 'type')).toThrow();
    expect(() => groupByKey({}, 'type')).toThrow();
    expect(() => groupByKey(123, 'type')).toThrow();
  });

  // it('throws if key is not a string', () => {
  //   const arr = [{ a: 1 }, { a: 2 }];
  //   expect(() => groupByKey(arr, null)).toThrow();
  //   expect(() => groupByKey(arr, {})).toThrow();
  //   expect(() => groupByKey(arr, 42)).toThrow();
  // });
});
