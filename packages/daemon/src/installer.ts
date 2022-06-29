// global deps
import { bgBlack, bold } from "./lib/deps.ts";
import { prompt, Input, Confirm, Checkbox } from "./lib/deps.ts";

// env variables
import {
  NIX_FILE_NAME,
  NIX_INSTALLATION_PATH,
  NIX_INSTALLED,
  NIX_REPOSITORY,
  NIX_USERNAME,
  NIX_VERSION,
} from "./lib/env.ts";

// functions
import { log } from "./lib/log.ts";
import { DownloadGithubFile } from "./lib/download-github-file.ts";

// @ts-ignore: this function will ALWAYS return a boolean value
const isAlreadyInstalled = async (path: string): Promise<boolean> => {
  try {
    await Deno.readTextFile(path);

    return true;
  } catch (error) {
    const { name } = error as Error;

    if (name === "NotFound") {
      return false;
    }
  }
};

const nixAlreadyInstalled = Deno.env.get("NIX_INSTALLED");

console.log("🗄️  Nix");
log("A web first file manager. \n", async () => {
  if (await isAlreadyInstalled(nixAlreadyInstalled!)) {
    const reinstall = "Reinstall";
    const uninstall = "Uninstall";

    const actions = {
      [reinstall]: async () => {},
      [uninstall]: async () => {
        // get installation path from env
        const confirmDelete = await Confirm.prompt({
          message: "Do you really want to delete it?",
        });

        if (confirmDelete) {
          const installationPath = Deno.env.get(NIX_INSTALLATION_PATH);
          const installedFilename = Deno.env.get(NIX_INSTALLED);

          await Deno.remove(`${installationPath}/${installedFilename}`);
        } else {
          Deno.exit(1);
        }
      },
    };

    const nextAction: "Reinstall" | "Uninstall" = (await Checkbox.prompt({
      message: "Nix is already installed, what would you like to do next?",

      options: [reinstall, uninstall],
    })) as unknown as "Reinstall" | "Uninstall";

    await actions[nextAction]();
  } else {
    const HOME_DIRECTORY = Deno.env.get("HOME");
    const DEFAULT_INSTALLATION_PATH = `${HOME_DIRECTORY}`;
    const DEFAULT_INSTALLATION_NAME = "nix";

    let installationPath: string;
    let installationFileName: string;

    await prompt([
      {
        name: "path",
        message:
          "What directory you would like to install Nix in? (without trailing slash, eg: '/' at the end)",
        type: Input,
        default: `${HOME_DIRECTORY}`,
        after: ({ path }, next) => {
          installationPath = path || DEFAULT_INSTALLATION_PATH;

          next("filename");
        },
      },
      {
        name: "filename",
        message: "What file name you would like to give Nix binaries?",
        type: Input,
        default: "nix",
        after: ({ filename }, next) => {
          installationFileName = filename || DEFAULT_INSTALLATION_NAME;

          next("confirm");
        },
      },
      {
        name: "confirm",
        message: "Is the installation path correct?",
        type: Confirm,
        default: true,
        after: ({ confirm }, next) => {
          if (!confirm) {
            return next("path");
          }

          // proceed with installtion
          console.log("\n");
          log(bgBlack(bold("Installing Nix File Manager daemon")));
          log(`installing the daemon at ${installationPath}`, async () => {
            // get file from github
            if (typeof NIX_VERSION === "boolean") {
              log("No releases could be found :(");
            } else {
              try {
                await DownloadGithubFile({
                  title: "Nix Daemon",
                  fileName: "nix",
                  path: `${installationPath}/${installationFileName}`,
                  version: NIX_VERSION,
                  username: NIX_USERNAME,
                  repository: NIX_REPOSITORY,
                });
              } catch (error) {
                console.log(error);
              }

              log("\nFinished downloading Nix daemon");

              log("add the 'nix' command to your terminal file:\n");
              log(`alias nix="${installationPath}"`);

              Deno.env.set(NIX_INSTALLATION_PATH, installationPath);
              Deno.env.set(NIX_FILE_NAME, installationFileName);
              Deno.env.set(NIX_INSTALLED, "true");
            }
          });
        },
      },
    ]);
  }
});
