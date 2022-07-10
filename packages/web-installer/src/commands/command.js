// @ts-check
export class Command {
  textSpeed = 0;
  isGUI = false;
  commands = {};
  clear = false;

  static Create = class {
    #textSpeed = 0;
    #isGUI = false;
    #commands = {};
    #clear = false;

    // /**
    //  *
    //  * @param {Record<string, (...any) => any>} commands
    //  */
    // constructor(commands) {
    //   this.commands = commands;
    // }

    /**
     * @param {boolean | undefined} isGUI
     */
    GUI(isGUI) {
      this.#isGUI = isGUI ?? true;

      return this;
    }

    /**
     * @param {number} ms
     */
    speed(ms) {
      this.#textSpeed = ms;

      return this;
    }

    /**
     * @param {boolean | undefined} arg
     */
    clear(arg) {
      this.#clear = arg ?? false;

      return this;
    }

    /**
     *
     * @param {Record<string, (...any) => void>} commands
     * @returns
     */
    commands(commands) {
      this.#commands = commands;

      return this;
    }

    build() {
      const command = new Command(
        this.#commands,
        this.#isGUI,
        this.#textSpeed,
        this.#clear
      );

      return command;
    }
  };

  constructor(commands, isGUI, speed, clear) {
    this.commands = commands;
    this.isGUI = isGUI;
    this.textSpeed = speed;
    this.clear = clear;
  }

  render(...args) {
    return this.commands.default(...args);
    // if (args.length === 0) {
    //   // run default command!
    //   this.#commands["default"]();
    //   return;
    // }

    // const parsedArgs = args.map((arg) => {
    //   const argHasValue = arg.includes(" ");

    //   if (!argHasValue) {
    //     return {
    //       command: arg,
    //     };
    //   }

    //   // check if arg contains value
    //   const [command, ...values] = arg.split(" ");

    //   return {
    //     command: command,
    //     values,
    //   };
    // });

    // // look up to the table to see which commands exist or not
    // const [nonExistingCommands, existingCommands] = filter(
    //   parsedArgs,
    //   (arg) => !this.#commands[arg.command]
    // );

    // if (nonExistingCommands.length > 0) {
    //   nonExistingCommands.forEach(({ command }) => {
    //     console.log(`command ${command} does not exist!`);
    //   });
    //   return;
    // }

    // // // call the args
    // existingCommands.forEach((arg) =>
    //   console.log(this.#commands[arg.command](arg.values))
    // );
  }
}
