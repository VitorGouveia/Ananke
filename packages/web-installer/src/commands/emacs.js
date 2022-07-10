// @ts-check
import { html } from "../deps.js";
import { Command } from "./command.js";

export const emacs = new Command.Create()
  .GUI(true)
  .speed(0)
  .clear(true)
  .commands({
    default: () => html`<h1>Welcome to DOOM Emacs!</h1>`,
  })
  .build();
