/**
 * Join classes together
 * @param  {(string | undefined)[]} classes
 */
export const classnames = (...classes) => {
  return `${classes
    // filtering out all non truthy values
    .filter((_class) => !!_class)
    .map((_class) => _class.trim())
    .join(" ")}`;
};
