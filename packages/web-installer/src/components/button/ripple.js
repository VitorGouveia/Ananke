// @ts-check
import { html, virtual } from "../../deps.js";

import { classnames } from "../../util/classnames.js";
import { createElement } from "../../util/create-element.js";

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
  const handleCreateRipple = (event) => {
    const button = event.currentTarget;

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const circle = createElement`
      <span class="ripple"></span>
    `;

    circle.styles(`
      width: ${diameter}px;
      height: ${diameter}px;

      left: ${event.clientX - button.offsetLeft - radius}px;
      top: ${event.clientY - button.offsetTop - radius}px;
    `);

    const [ripple] = button.getElementsByClassName("ripple");

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle.element);

    callback && callback();
  };

  return html`
    <button
      class=${classnames("ripple", classname)}
      @click=${handleCreateRipple}
    >
      ${children}
    </button>
  `;
}

export const Ripple = virtual(Button);
