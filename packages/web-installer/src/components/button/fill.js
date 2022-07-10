// @ts-check

import { html, virtual, useCallback, useState } from "../../deps.js";

/**
 * @param {string | html} beforeContent - Content displayed before button click;
 * @param {string | html} afterContent - Content displayed after button click;
 * @param {{ isActive: boolean | undefined, callback: (() => void) | undefined, classname: string | undefined }} options - Button configuration
 * @returns
 */
function Button(
  beforeContent,
  afterContent,
  // @ts-ignore
  { isActive = false, callback, classname } = {}
) {
  const [active, setIsActive] = useState(isActive);

  const handleClick = useCallback(() => {
    setIsActive((previous) => !previous);

    callback && callback();
  }, []);

  return html`
    <button
      class=${classname ? `fill ${classname}` : "fill"}
      @click=${handleClick}
      data-active=${active}
    >
      <label>${beforeContent}</label>

      <span>${afterContent}</span>
    </button>
  `;
}

export const Fill = virtual(Button);
