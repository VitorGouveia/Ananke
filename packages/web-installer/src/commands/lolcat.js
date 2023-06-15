// @ts-check
import { html } from "../deps.js";
import { ASCIIAnimation } from "../functions/ascii-animation.js";
import { Command } from "./command.js";

// https://github.com/maykbrito/fronteditor

export const lolcat = new Command.Create()
  .GUI(true)
  .speed(0)
  .clear(true)
  .commands({
    default: (...args) => {
      const animation = [
        "♡",
        "❤",
        "e",
        "e",
        "eu",
        "eu",
        "eu t",
        "eu t",
        "eu te",
        "eu te",
        "eu te ",
        "eu te ",
        "eu te a",
        "eu te a",
        "eu te am",
        "eu te am",
        "eu te amo",
        "eu te amo",
        "eu te am",
        "eu te am",
        "eu te a",
        "eu te a",
        "eu te ",
        "eu te",
        "eu t",
        "eu ",
        "eu",
        "e",
        "❤️",
        "❤️",
        "❤️",
        "❤️",
      ];

      const container = document.createElement("div");
        container.classList.add("rainbow")

      new ASCIIAnimation(container, {
        animation,
        speed: 50,
      });

      return [
        html`loading...`,
        (async () => {
          return html`<div class="rainbow">EU TE AMO, giovanna.</div>`;
        })(),
      ];
    },
  })
  .build();
