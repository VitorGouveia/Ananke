import { version } from "./fetch-version.ts";

const KEY_PREFIX = "@NIX:";

class Nix {
  public env = {
    installed: `${KEY_PREFIX}:INSTALLED`,
    filename: `${KEY_PREFIX}:INSTALLED_FILE_NAME`,
    installationPath: `${KEY_PREFIX}:INSTALLATION_PATH`,
  };
  public username = "VitorGouveia";
  public repository = "Nix";
  public version = async () =>
    await version({
      repository: this.repository,
      username: this.username,
    });
}

const nix = new Nix();

const NIX_USERNAME = nix.username;
const NIX_REPOSITORY = nix.repository;
const NIX_VERSION = await nix.version();

const NIX_INSTALLED = nix.env.installed;
const NIX_FILE_NAME = nix.env.filename;
const NIX_INSTALLATION_PATH = nix.env.installationPath;

export {
  NIX_USERNAME,
  NIX_REPOSITORY,
  NIX_VERSION,
  NIX_INSTALLED,
  NIX_FILE_NAME,
  NIX_INSTALLATION_PATH,
};
