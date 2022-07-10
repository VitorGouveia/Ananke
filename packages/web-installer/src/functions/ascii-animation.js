/**
 * default rendering method for ASCII animations
 * @param {string} animate
 * @returns
 */
const defaultRenderer = (animate) => `<pre>${animate}</pre>`;

const defaultInject = (DOMTarget, animation) =>
  (DOMTarget.innerHTML = animation);

export class ASCIIAnimation {
  frame = 0;
  speed = 10;
  animation = [];
  intervalID = null;
  render = null;
  inject = null;

  /**
   * @param {HTMLElement} DOMTarget
   * @param {{ animation: string[], speed: number | undefined, render: ((animate: string) => string) | undefined, inject: ((DOMTarget: HTMLElement, animation: string) => void) | undefined }} options
   */
  constructor(
    DOMTarget,
    { animation, speed = 10, render = defaultRenderer, inject = defaultInject }
  ) {
    this.animation = animation;
    this.speed = speed;
    this.render = render;
    this.inject = inject;

    const animationArray = this.animation.map((animate) => {
      const filteredAnimate = animate.replace(/ /g, "&nbsp;");

      return this.render(filteredAnimate);
    });

    this.inject(DOMTarget, animationArray[0]);

    this.frame++;

    const intervalID = setInterval(() => {
      this.inject(DOMTarget, animationArray[this.frame]);

      this.frame++;

      if (this.frame >= this.animation.length) {
        this.frame = 0;
      }
    }, this.speed);

    this.intervalID = intervalID;
  }

  stop() {
    clearInterval(this.intervalID);
  }
}
