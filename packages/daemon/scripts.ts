import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.5.0/mod.ts";

export default <ScriptsConfiguration>{
  scripts: {
    // self container version of the build WITH the deno runtime (HUGE FILE)
    "build-installer-binary":
      "deno compile --unstable --allow-all --output dist/installer ./src/installer.ts",
    // self container version of the build WITHOUT the deno runtime (small file)
    // run the bundle with deno:
    // deno run --unstable --allow-all <bundle>
    "build-installer-bundle":
      "deno bundle --unstable ./src/installer.ts dist/installer.bundle.js",
    "build-installer": "vr build-installer-binary && vr build-installer-bundle",
    dev: {
      cmd: "deno run --allow-run --allow-read --allow-write --allow-net ./src/index.ts",
      watch: true,
    },
    build:
      "deno compile --output dist/daemon --allow-run --allow-read --allow-write --allow-net ./src/index.ts",
    start: "./daemon",
  },
};
