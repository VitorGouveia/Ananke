// @ts-check
import { html, virtual } from "../../deps.js";

import { classnames } from "../../util/classnames.js";

/**
 * @param {string} children - Content displayed before button click;
 * @param {{ callback: (() => void) | undefined, classname: string | undefined }} options - Button configuration
 * @returns
 */
function Button(
  children,
  // @ts-ignore
  { callback, classname } = {}
) {
  return html`
    <button @click=${callback} class=${classnames("lettered", classname)}>
      <div>
        ${children
          .trim()
          .split("")
          .map((character) => html`<span>${character}</span> `)}
      </div>
    </button>
  `;
}

export const Lettered = virtual(Button);
