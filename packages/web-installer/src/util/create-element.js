/**
 * convert string to CSS
 * @param {TemplateStringsArray} styles
 * @param {any[]} values
 */
export const styles = (styles, ...values) => {
  const [styleSheet] = document.styleSheets;

  const rule = styles.map((_rule, index) => {
    const value = values[index] || "";

    return `${_rule}${value}`;
  });

  styleSheet.insertRule(rule.join("").trim());

  return rule;
};

/**
 * create javascript html elements with strings
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {{ element: HTMLElement, styles: (styles: string) => HTMLElement }}
 */
export const createElement = (strings, ...values) => {
  const template = document.createElement("template");

  template.innerHTML = strings.join("").trim();

  /** @type {HTMLElement} */
  const element = template.content.firstElementChild;

  return {
    element,
    styles: (styles) => {
      const rules = styles
        .split(";")
        // removes last (usually empty) line
        .slice(0, -1)
        .map((line) => {
          const [rule, value] = line.trim().split(":");

          element.style[rule] = value;

          return line.trim();
        })
        // dont return empty strings
        .filter((value) => !!value);

      return rules;
    },
  };
};
