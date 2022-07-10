// @ts-check
import { GLOBAL_VARIABLES } from "../vars.js";
import { Command } from "./command.js";
import { html } from "../deps.js";

export const ls = new Command.Create()
  .GUI(false)
  .speed(0)
  .clear(false)
  .commands({
    default: (...args) => {
      // list current CWD files
      const { SYSTEM: system, CWD: working_directory_id } = GLOBAL_VARIABLES;

      const currentWorkingDirectory = system
        .filter(({ parentId }) => parentId === working_directory_id)
        .sort((a, b) => a.name.localeCompare(b.name));

      return html`${currentWorkingDirectory.map(({ name }) => name).join(" ")}`;
    },
  })
  .build();
