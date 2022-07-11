// @ts-check
import { html } from "../deps.js";
import { Command } from "./command.js";

// https://github.com/maykbrito/fronteditor

export const repl = new Command.Create()
  .GUI(true)
  .speed(0)
  .clear(true)
  .commands({
    default: (...args) => {
      return [
        html`loading...`,
        (async () => {
          return html`loaded!`;
        })(),
      ];
    },
  })
  .build();
