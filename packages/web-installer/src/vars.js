// @ts-check
import { FILE_STRUCTURE } from "./components/file-structure.js";

const [HOME, DEFAULT_USER] = FILE_STRUCTURE;

const INITIAL_DIRECTORY = `/${HOME.name}/${DEFAULT_USER?.name}`;

export const GLOBAL_VARIABLES = {
  $HOME: INITIAL_DIRECTORY,
  CWD: DEFAULT_USER?.id || "",
  SYSTEM: FILE_STRUCTURE,
};
