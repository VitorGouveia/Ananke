/**
 * enchanced version of filter
 * @template Type
 * @param {Type[]} array
 * @param {(element: Type) => any} statement
 */
export const filter = (array, statement) => {
  const filtered = [];
  const nonfiltered = [];

  for (let index = 0; index < array.length; index++) {
    const result = statement(array[index]);

    if (!!result) {
      filtered.push(array[index]);
    } else {
      nonfiltered.push(array[index]);
    }
  }

  return [filtered, nonfiltered];
};
