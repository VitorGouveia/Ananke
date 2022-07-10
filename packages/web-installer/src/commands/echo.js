// @ts-check
import { GLOBAL_VARIABLES } from "../vars.js";
import { Command } from "./command.js";

export const echo = new Command.Create()
  .GUI(false)
  .speed(0)
  .clear(false)
  .commands({
    /** @param {string[]} args */
    default: (...args) => {
      const replacedArgs = args.map((arg) => {
        let finalArg = arg;

        Object.entries(GLOBAL_VARIABLES).forEach(([key, value]) => {
          finalArg = finalArg.replace(key, JSON.stringify(value) + " "); // idk why but replace just eats the spaces
        });

        // @ts-ignore
        return finalArg.replaceAll(/\\n/g, "\n");
      });

      return replacedArgs;
    },
  })
  .build();
