// @ts-check
import { GLOBAL_VARIABLES } from "../vars.js";
import { Command } from "./command.js";

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see https://stackoverflow.com/a/7924240/938822
 */
function occurrences(string, subString, allowOverlapping) {
  string += "";
  subString += "";
  if (subString.length <= 0) return string.length + 1;

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

export const cd = new Command.Create()
  .GUI(false)
  .speed(0)
  .clear(false)
  .commands({
    /** @param {string[]} args */
    default: (...args) => {
      const { SYSTEM: system, CWD: working_directory_id } = GLOBAL_VARIABLES;

      const [path] = args;

      // check for leading '/'

      const working_directory = system.find(
        ({ id }) => working_directory_id === id
      );

      if (path.includes("..")) {
        let slashCount = occurrences(path, "..", false);

        let final_destination = null;
        let tmp_parentId = working_directory?.parentId;

        while (slashCount !== 0) {
          slashCount -= 1;

          const parentDir = system.find(({ id }) => tmp_parentId === id);
          if (!parentDir) {
            final_destination = null;
            break;
          }

          tmp_parentId = parentDir?.parentId;

          final_destination = parentDir;
        }

        if (!final_destination) {
          return `cd: no such file or directory: ${path}`;
        }

        GLOBAL_VARIABLES.CWD = final_destination?.id;

        return;
      }

      if (path.includes("/")) {
        // cd Documents/DocumentsNested

        const nestedFolders = path.split("/");
        const newNestedFolders = [];

        for (let i = 0; i < nestedFolders.length; i++) {
          const match = system.find(({ name }) => nestedFolders[i] === name);

          if (!match) {
            return `cd: no such file or directory: ${nestedFolders[i]}`;
          }

          newNestedFolders.push(match);
        }

        const finalFolder = newNestedFolders.pop();

        if (!finalFolder) {
          return `cd: no such file or directory: ${path}`;
        }

        GLOBAL_VARIABLES.CWD = finalFolder.id;
      }

      const newWorkingDirectory = system.find(
        (directory) =>
          directory.name === path && directory.parentId === working_directory_id
      );

      if (!newWorkingDirectory) {
        return `cd: no such file or directory: ${path}`;
      }

      GLOBAL_VARIABLES.CWD = newWorkingDirectory.id;

      return "";
    },
  })
  .build();
