/**
 * compares whether two words are similar
 * @param {string} base - base value
 * @param {string} current - value to compare against base
 */
export const levenshteinDistance = (base, current) => {
  if (base.length === 0) {
    return current.length;
  }

  if (current.length === 0) {
    return base.length;
  }

  return Math.min(
    levenshteinDistance(base.substring(1), current) + 1,
    levenshteinDistance(current.substring(1), base) + 1,
    levenshteinDistance(base.substring(1), current.substring(1)) +
      (base[0] !== current[0] ? 1 : 0)
  );
};
