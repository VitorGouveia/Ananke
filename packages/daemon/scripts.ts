import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.5.0/mod.ts";

export default <ScriptsConfiguration>{
  scripts: {
    "build-installer":
      "deno compile --unstable --output dist/installer --allow-run --allow-env --allow-read --allow-write --allow-net ./src/installer.ts",
    dev: {
      cmd: "deno run --allow-run --allow-read --allow-write --allow-net ./src/index.ts",
      watch: true,
    },
    build:
      "deno compile --output dist/daemon --allow-run --allow-read --allow-write --allow-net ./src/index.ts",
    start: "./daemon",
  },
};
