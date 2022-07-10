import { Shortcuts } from "./functions/shortcut.js";

// @TODO: create book
// @TODO: manage system partitions and files

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const shortcut = new Shortcuts();

let SELECTED_TERMINAL_ID = 0;

function* TerminalID() {
  var index = 0;

  while (true) yield index++;
}

const terminalIDGenerator = TerminalID();

const MOD = "ctrl";
// @TODO: listen to horizontal arrows for custom block cursor;

/**
 * @type {Record<string, { key: string, callback: (event: KeyboardEvent) => void }>}
 */
const GLOBAL_SHORTCUTS = {
  create_new_terminal: {
    key: `${MOD}+enter`,
    callback: (event) => {
      event.preventDefault();
      console.log("open new terminal");
    },
  },
  open_fullscreen_terminal: {
    key: `${MOD}+shift+f`,
    callback: (event) => {
      event.preventDefault();
      console.log("open fullscreen terminal");
    },
  },
  kill_window: {
    key: `ctrl+shift+c`,
    callback: (event) => {
      event.preventDefault();
      console.log("killing selected window!");
    },
  },
};

Object.entries(GLOBAL_SHORTCUTS).forEach(([_, { key, callback }]) => {
  shortcut.add(key, callback);
});

/** SPLASH SCREEN */
setTimeout(() => {
  // document.querySelector("#splash").setAttribute("hidden", "true");
}, 2000);

import {
  html,
  component,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "./deps.js";

import { ASCIIAnimation } from "./functions/ascii-animation.js";

// @TODO: component imports must be dynamic!
import { Button } from "./components/button/index.js";

// @TODO: add // @ts-check in all js files
import { levenshteinDistance } from "./functions/levenshtein.js";

/**
 * this should really be a function that receives screen APIs
 * such as clear terminal, open file, etc e etc
 */
const OLD_COMMANDS = {
  help: {
    gui: false,
    textSpeed: 50,
    clear: false,
    // prettier-ignore
    commands: [`
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
VVVVVVVV           VVVVVVVV  iiii           tttt                                                            GGGGGGGGGGGGG                                                                                  iiii                    
V::::::V           V::::::V i::::i       ttt:::t                                                         GGG::::::::::::G                                                                                 i::::i                   
V::::::V           V::::::V  iiii        t:::::t                                                       GG:::::::::::::::G                                                                                  iiii                    
V::::::V           V::::::V              t:::::t                                                      G:::::GGGGGGGG::::G                                                                                                          
  V:::::V           V:::::V iiiiiii ttttttt:::::ttttttt       ooooooooooo   rrrrr   rrrrrrrrr         G:::::G       GGGGGG   ooooooooooo   uuuuuu    uuuuuu  vvvvvvv           vvvvvvv    eeeeeeeeeeee    iiiiiii   aaaaaaaaaaaaa   
  V:::::V         V:::::V  i:::::i t:::::::::::::::::t     oo:::::::::::oo r::::rrr:::::::::r       G:::::G               oo:::::::::::oo u::::u    u::::u   v:::::v         v:::::v   ee::::::::::::ee  i:::::i   a::::::::::::a  
    V:::::V       V:::::V    i::::i t:::::::::::::::::t    o:::::::::::::::or:::::::::::::::::r      G:::::G              o:::::::::::::::ou::::u    u::::u    v:::::v       v:::::v   e::::::eeeee:::::ee i::::i   aaaaaaaaa:::::a 
    V:::::V     V:::::V     i::::i tttttt:::::::tttttt    o:::::ooooo:::::orr::::::rrrrr::::::r     G:::::G    GGGGGGGGGGo:::::ooooo:::::ou::::u    u::::u     v:::::v     v:::::v   e::::::e     e:::::e i::::i            a::::a 
      V:::::V   V:::::V      i::::i       t:::::t          o::::o     o::::o r:::::r     r:::::r     G:::::G    G::::::::Go::::o     o::::ou::::u    u::::u      v:::::v   v:::::v    e:::::::eeeee::::::e i::::i     aaaaaaa:::::a 
      V:::::V V:::::V       i::::i       t:::::t          o::::o     o::::o r:::::r     rrrrrrr     G:::::G    GGGGG::::Go::::o     o::::ou::::u    u::::u       v:::::v v:::::v     e:::::::::::::::::e  i::::i   aa::::::::::::a 
        V:::::V:::::V        i::::i       t:::::t          o::::o     o::::o r:::::r                 G:::::G        G::::Go::::o     o::::ou::::u    u::::u        v:::::v:::::v      e::::::eeeeeeeeeee   i::::i  a::::aaaa::::::a 
        V:::::::::V         i::::i       t:::::t    tttttto::::o     o::::o r:::::r                  G:::::G       G::::Go::::o     o::::ou:::::uuuu:::::u         v:::::::::v       e:::::::e            i::::i a::::a    a:::::a 
          V:::::::V         i::::::i      t::::::tttt:::::to:::::ooooo:::::o r:::::r                   G:::::GGGGGGGG::::Go:::::ooooo:::::ou:::::::::::::::uu        v:::::::v        e::::::::e          i::::::ia::::a    a:::::a 
          V:::::V          i::::::i      tt::::::::::::::to:::::::::::::::o r:::::r                    GG:::::::::::::::Go:::::::::::::::o u:::::::::::::::u         v:::::v          e::::::::eeeeeeee  i::::::ia:::::aaaa::::::a 
            V:::V           i::::::i        tt:::::::::::tt oo:::::::::::oo  r:::::r                      GGG::::::GGG:::G oo:::::::::::oo   uu::::::::uu:::u          v:::v            ee:::::::::::::e  i::::::i a::::::::::aa:::a
            VVV            iiiiiiii          ttttttttttt     ooooooooooo    rrrrrrr                         GGGGGG   GGGG   ooooooooooo       uuuuuuuu  uuuu           vvv               eeeeeeeeeeeeee  iiiiiiii  aaaaaaaaaa  aaaa
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
    `,
  `
██    ██ ██ ████████  ██████  ██████       ██████   ██████  ██    ██ ██    ██ ███████ ██  █████  
██    ██ ██    ██    ██    ██ ██   ██     ██       ██    ██ ██    ██ ██    ██ ██      ██ ██   ██ 
██    ██ ██    ██    ██    ██ ██████      ██   ███ ██    ██ ██    ██ ██    ██ █████   ██ ███████ 
  ██  ██  ██    ██    ██    ██ ██   ██     ██    ██ ██    ██ ██    ██  ██  ██  ██      ██ ██   ██ 
  ████   ██    ██     ██████  ██   ██      ██████   ██████   ██████    ████   ███████ ██ ██   ██ 
                                                                                                  
                                                                                                        
  `,
  `
██▒   █▓ ██▓▄▄▄█████▓ ▒█████   ██▀███       ▄████  ▒█████   █    ██  ██▒   █▓▓█████  ██▓ ▄▄▄      
▓██░   █▒▓██▒▓  ██▒ ▓▒▒██▒  ██▒▓██ ▒ ██▒    ██▒ ▀█▒▒██▒  ██▒ ██  ▓██▒▓██░   █▒▓█   ▀ ▓██▒▒████▄    
  ▓██  █▒░▒██▒▒ ▓██░ ▒░▒██░  ██▒▓██ ░▄█ ▒   ▒██░▄▄▄░▒██░  ██▒▓██  ▒██░ ▓██  █▒░▒███   ▒██▒▒██  ▀█▄  
  ▒██ █░░░██░░ ▓██▓ ░ ▒██   ██░▒██▀▀█▄     ░▓█  ██▓▒██   ██░▓▓█  ░██░  ▒██ █░░▒▓█  ▄ ░██░░██▄▄▄▄██ 
    ▒▀█░  ░██░  ▒██▒ ░ ░ ████▓▒░░██▓ ▒██▒   ░▒▓███▀▒░ ████▓▒░▒▒█████▓    ▒▀█░  ░▒████▒░██░ ▓█   ▓██▒
    ░ ▐░  ░▓    ▒ ░░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░    ░▒   ▒ ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒    ░ ▐░  ░░ ▒░ ░░▓   ▒▒   ▓▒█░
    ░ ░░   ▒ ░    ░      ░ ▒ ▒░   ░▒ ░ ▒░     ░   ░   ░ ▒ ▒░ ░░▒░ ░ ░    ░ ░░   ░ ░  ░ ▒ ░  ▒   ▒▒ ░
      ░░   ▒ ░  ░      ░ ░ ░ ▒    ░░   ░    ░ ░   ░ ░ ░ ░ ▒   ░░░ ░ ░      ░░     ░    ▒ ░  ░   ▒   
      ░   ░               ░ ░     ░              ░     ░ ░     ░           ░     ░  ░ ░        ░  ░
      ░                                                                    ░                        
  `],
  },
  "hello world": {
    gui: false,
    textSpeed: 10,
    clear: false,
    commands: ["Hello world my fiend"],
  },
  clear: {
    gui: false,
    textSpeed: 0,
    clear: true,
    commands: [],
  },
  lolcat: {
    gui: false,
    textSpeed: 0,
    clear: false,
    commands: [
      html`<div class="rainbow">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos assumenda
        autem rem et sit ipsa eum magni esse iste eos, ex, numquam deleniti
        facilis velit ab quidem iure! Tenetur, ratione.
      </div>`,
    ],
  },
  animation: {
    gui: false,
    textSpeed: 0,
    clear: false,
    commands: [
      (() => {
        const animation = [
          "[>        ]",
          "[=>       ]",
          "[==>      ]",
          "[===>     ]",
          "[====>    ]",
          "[=====>   ]",
          "[======>  ]",
          "[=======> ]",
          "[========>]",
        ];

        const container = document.createElement("div");

        new ASCIIAnimation(container, {
          animation,
          speed: 50,
        });

        return html`${container}`;
      })(),
    ],
  },
};

/** @type {Record<string, import("./commands/command").Command>} */
const commandList = {
  ...(await import("./commands/clear.js")),
  ...(await import("./commands/echo.js")),
  ...(await import("./commands/emacs.js")),
  ...(await import("./commands/ls.js")),
  ...(await import("./commands/cd.js")),
};

const { Folder } = await import("./components/folder.js");

/**
 *
 * @param {HTMLElement} element
 * @returns
 */
function Terminal(element) {
  const id = useRef(terminalIDGenerator.next().value);

  const [command, setCommand] = useState("");
  const [commands, setCommands] = useState([]);
  const [history, setHistory] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const debug = useRef(!!window.location.search.includes("debug"));

  const getBashSnapshot = useCallback(
    (value) => {
      /**
       *
       * @returns {"green" | "red"}
       */
      const bashColor = () => {
        const completableWords = [...Object.keys(commandList), ...history];

        const perfectWordMatch = [...new Set(completableWords)].find((word) =>
          value.trim().includes(word.trim())
        );

        return perfectWordMatch ? "green" : "red";
      };

      const bashSnapshot = html`
        <div style="display: flex; align-items: center;">
          <p>
            vitor
            <span>${Folder()}</span>

            <span> Nix/packages </span>

            on master
            <span>${">"}</span>
          </p>

          <span style="width: 5px !important; height: 100%;"></span>

          <div
            style=${`
            caret-color: #fff;
            outline: none;
            color: ${bashColor()}
          `}
          >
            ${value}
          </div>
        </div>
      `;

      return bashSnapshot;
    },
    [commandList, history]
  );

  /**
   *
   * @param {ClipboardEvent} event
   */
  const handlePaste = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text");

    element.querySelector("#bash").textContent = pastedData;
    setCommand(pastedData);
  };

  // prettier-ignore
  const handleSubmit = useCallback((_value) => {
    /** @type {string} */
    const value = _value;

    element.querySelector("#bash").textContent = "";

    setCommand("");
    setHistory([...history, value]);

    // echo "hello world" | lolcat

    const [cmd, ...args] = command.trimStart().split(" ");
    const currentCommand = cmd;

    const bashSnapshot = getBashSnapshot(value);

    if (!commandList[currentCommand]) {
      // find a similar command
      const commandListArray = Object.keys(commandList);

      const similarityHeap = commandListArray.map((command) =>
        levenshteinDistance(command, currentCommand)
      );

      const SIMILARITY_THRESHOLD = 2;

      if (Math.min(...similarityHeap) > SIMILARITY_THRESHOLD) {
        setCommands([
          ...commands,
          {
            type: "text",
            html: [bashSnapshot, `command ${currentCommand} doesnt exist`],
          },
        ]);

        return;
      }

      // get the lowest number in the array
      const indexofLowestNumberCommand = similarityHeap.indexOf(
        Math.min(...similarityHeap)
      );

      const closestCommand = commandListArray[indexofLowestNumberCommand];

      setCommands([
        ...commands,
        {
          type: "text",
          html: [bashSnapshot, `command ${currentCommand} doesnt exist, did you mean ${closestCommand}`],
        },
      ]);

      return;
    }

    const commandEXE = commandList[currentCommand];

    const result = commandEXE.render(...args);

    /** @type {{ type: "virtual" | "text", html: string }} */
    const commandObj = {
      type: commandEXE.isGUI ? "virtual" : "text",
      html: [bashSnapshot, result],
    };

    if (commandEXE.clear) {
      setCommands([commandObj]);
    } else {
      setCommands([...commands, commandObj]);
    }

    // if (!commandList[currentCommand]) {
    //   // check in the command list if any command looks like this one
    //   const commandListArray = Object.keys(commandList);

    //   const similarityHeap = commandListArray.map((command) =>
    //     levenshteinDistance(command, currentCommand)
    //   );

    //   // get the lowest number in the array
    //   const indexofLowestNumberCommand = similarityHeap.indexOf(
    //     Math.min(...similarityHeap)
    //   );

    //   const closestCommand = commandListArray[indexofLowestNumberCommand];

    //   setCommands([
    //     ...commands,
    //     {
    //       type: "text",
    //       html: `command ${currentCommand} doesnt exist, did you mean ${closestCommand}`,
    //     },
    //   ]);
    //   return;
    // }
  }, [autocomplete, commands, command, setCommands]);

  useEffect(() => {
    element.querySelector("#bash").focus();
  }, []);

  // <KEYBINDINGS></KEYBINDINGS>
  useEffect(() => {
    /** @type {Record<string, { key: string, callback: (event: KeyboardEvent) => void }>} */
    const LOCAL_SHORTCUTS = {
      submit: {
        key: "enter",
        callback: (event) => {
          event.preventDefault();

          if (document.activeElement.hasAttribute("data-autocomplete")) {
            return;
          }

          // put command in queue
          handleSubmit(command);
        },
      },
      autocomplete: {
        key: "tab",
        callback: (event) => {
          if (autocomplete.length > 0) {
            // select the elements
            return;
          }

          event.preventDefault();

          const similarCommands = Object.keys(commandList).filter((cmd) =>
            cmd.startsWith(command.trim())
          );

          setAutocomplete(similarCommands);

          // change color of the thing
          element.querySelector("#bash").style.color = "green";
        },
      },
      cancel: {
        key: "ctrl+c",
        callback: (event) => {
          // if text is selected then dont change default behaviour
          if (!window.getSelection().isCollapsed) {
            return;
          }

          event.preventDefault();

          const bashSnapshot = getBashSnapshot(command);

          setCommands([
            ...commands,
            {
              type: "text",
              html: [bashSnapshot, ""],
            },
          ]);

          setCommand("");
          element.querySelector("#bash").textContent = "";
        },
      },
      clear: {
        key: "ctrl+l",
        callback: (event) => {
          event.preventDefault();

          setCommands([]);
        },
      },
      suspend: {
        key: "ctrl+x",
        callback: (event) => {
          event.preventDefault();

          element.querySelector("#bash").textContent = "";
          setCommand("");
        },
      },
    };

    // add keybinding for arrow up and down
    // search for commands in history

    // prettier-ignore
    Object.entries(LOCAL_SHORTCUTS).forEach(([_, { key, callback }]) => {
      shortcut.add(key, callback);
    });

    const forbiddenShortcuts = Object.values({
      ...LOCAL_SHORTCUTS,
      ...GLOBAL_SHORTCUTS,
    }).map(({ key }) => {
      return key;
    });

    const bash = element.querySelector("#bash");

    /**
     *
     * @param {KeyboardEvent} event
     */
    const handleKeydown = (event) => {
      const key = event.key.toLowerCase();
      // check if not forbidden shortcut

      if (alphabet.includes(key) && !(document.activeElement === bash)) {
        event.preventDefault();

        element.querySelector("#bash").focus();
      }
    };

    if (SELECTED_TERMINAL_ID === id.current) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      Object.entries(LOCAL_SHORTCUTS).forEach(([name, { key }]) => {
        shortcut.remove(key);
      });

      if (SELECTED_TERMINAL_ID === id.current) {
        window.removeEventListener("keydown", handleKeydown);
      }
    };
  }, [
    command,
    commands,
    setCommands,
    handleSubmit,
    autocomplete,
    setAutocomplete,
  ]);

  return html`
    <section>
      ${commands.map((command) => {
        const [bashSnapshot, commandResult] = command.html;

        /** @type {Record<string, string>} */
        const COMMAND_RENDER_METHODS = {
          virtual: html` ${commandResult} `,
          text: html`
            ${bashSnapshot}
            <div class="text">${commandResult}</div>
          `,
        };

        if (!COMMAND_RENDER_METHODS[command.type]) {
          return html` sorry could not render your bash! `;
        }

        return COMMAND_RENDER_METHODS[command.type];
      })}

      <div style="display: flex; align-items: center;">
        <p>vitor ${Folder()} Nix/packages on master ${">"}</p>
        <span style="width: 5px !important; height: 100%;"></span>
        <div
          id="bash"
          contenteditable="true"
          style="
            min-width: 50px;
            caret-color: #fff; outline: none;
          "
          @paste=${handlePaste}
          @input=${(event) => {
            setCommand(event.target.innerText);
            // highlight

            const completableWords = [...Object.keys(commandList), ...history];

            const perfectWordMatch = [...new Set(completableWords)].find(
              (word) => event.target.innerText.trim().includes(word.trim())
            );

            if (perfectWordMatch) {
              event.target.style.color = "green";
            } else {
              event.target.style.color = "red";
            }
          }}
        ></div>
      </div>

      <br />

      ${autocomplete.map(
        (command) =>
          html`
            <button
              data-autocomplete
              @click=${(event) => {
                setAutocomplete([]);
                setCommand(event.target.innerText.trim());
              }}
              @focus=${(event) => {
                element.querySelector("#bash").innerText =
                  event.target.innerText.trim();
                // handleSubmit(event.target.innerText);
              }}
            >
              ${command}
            </button>
          `
      )}
      ${debug.current
        ? html`
            <h5>History</h5>

            <ul>
              ${history.map((command) => html`<li>${command}</li>`)}
            </ul>
          `
        : ""}
    </section>
  `;
}

customElements.define(
  "app-terminal",
  component(Terminal, {
    useShadowDOM: false,
  })
);
