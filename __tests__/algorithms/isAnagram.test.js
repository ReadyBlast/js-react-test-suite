import { isAnagram } from '~src/algorithms/isAnagram';

describe('isAnagram', () => {
  it('returns true for simple anagrams', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
    expect(isAnagram('elbow', 'below')).toBe(true);
    expect(isAnagram('evil', 'vile')).toBe(true);
  });

  it('returns false for strings with different characters', () => {
    expect(isAnagram('hello', 'world')).toBe(false);
    expect(isAnagram('abc', 'ab')).toBe(false);
  });

  it('handles different letter cases (should fail if case-sensitive)', () => {
    expect(isAnagram('Listen', 'Silent')).toBe(false); // case-sensitive
  });

  it('returns true for empty strings', () => {
    expect(isAnagram('', '')).toBe(true);
  });

  it('returns false when one string is empty', () => {
    expect(isAnagram('', 'a')).toBe(false);
    expect(isAnagram('a', '')).toBe(false);
  });

  // it('handles strings with spaces or punctuation as-is', () => {
  //   expect(isAnagram('a gentleman', 'elegant man')).toBe(false); // space matters
  //   expect(isAnagram('a!b@c', 'c@b!a')).toBe(true);
  // });

  it('throws if input is not a string', () => {
    // @ts-expect-error
    expect(() => isAnagram(null, 'abc')).toThrow();
    // @ts-expect-error
    expect(() => isAnagram('abc', undefined)).toThrow();
    // @ts-expect-error
    expect(() => isAnagram(123, 321)).toThrow();
  });
});

