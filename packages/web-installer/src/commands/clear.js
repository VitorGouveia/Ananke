// @ts-check
import { Command } from "./command.js";

export const clear = new Command.Create()
  .GUI(true)
  .speed(0)
  .clear(true)
  .commands({
    default: (...args) => {
      return "";
    },
  })
  .build();
