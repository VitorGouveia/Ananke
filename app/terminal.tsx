"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see https://stackoverflow.com/a/7924240/938822
 */
function occurrences(
  string: string,
  subString: string,
  allowOverlapping: boolean
) {
  string += ""
  subString += ""
  if (subString.length <= 0) return string.length + 1

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length

  while (true) {
    pos = string.indexOf(subString, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else break
  }
  return n
}

type Command = {
  id: string
  bashSnapshot?: {
    sign: string
    user: string
    folder: string
  }
} & (
  | {
      type: "text"
      result: string
    }
  | {
      id: string
      type: "virtual"
      result: ReactNode
    }
)

type Common = {
  id: string
  parentId: string | null
  name: string

  createdAt: number
  updatedAt: number
}

type File = Common & {
  content: string

  extension: string
  type: string
}

type Directory = Common & {
  children: Array<File | Directory>
}

function createDirectory({
  id,
  name,
  parentId,
}: {
  id: string
  name: string
  parentId: string | null
}): Directory {
  return {
    id,
    parentId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),

    name,
    children: [],
  }
}

function createFile({
  name,
  parentId,
  content,
  extension,
  type,
}: {
  name: string
  parentId: string | null
  content: string
  extension: string
  type: string
}): File {
  return {
    id: crypto.randomUUID(),
    parentId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),

    name,
    content,
    extension,
    type,
  }
}

export const DEFAULT_USER_ID = "2"

const FILE_STRUCTURE = [
  createDirectory({
    name: "home",
    id: "1",
    parentId: null,
  }),
  createDirectory({
    name: "jarbas",
    id: DEFAULT_USER_ID,
    parentId: "1",
  }),
  createDirectory({
    name: "Documents",
    id: "5",
    parentId: DEFAULT_USER_ID,
  }),
  createDirectory({
    name: "DocumentsNested",
    id: "15",
    parentId: "5",
  }),
  createDirectory({
    name: "DocumentsUltraNested",
    id: "20",
    parentId: "15",
  }),
  createDirectory({
    name: "www",
    id: "6",
    parentId: DEFAULT_USER_ID,
  }),
  createDirectory({
    name: ".config",
    id: "3",
    parentId: DEFAULT_USER_ID,
  }),
  createDirectory({
    name: "bspwm",
    id: "7",
    parentId: "3",
  }),
  createFile({
    name: "bspwmrc",
    parentId: "7",
    type: "rc",
    extension: "",
    content: JSON.stringify({
      bspc: {
        "border-width": 2,
        "window-gap": 5,

        focus: {
          "border-color": "$PRIMARY",
        },
      },
    }),
  }),
]

const [HOME, DEFAULT_USER] = FILE_STRUCTURE

function InputBox() {
  const user = "vitor.gouveia@MT2097-UBUNTU"
  const [$HOME, set$HOME] = useState(`/${HOME.name}/${DEFAULT_USER?.name}`)
  const [CWD, setCWD] = useState("5")
  const [system, setSystem] = useState(FILE_STRUCTURE)
  const sign = "$"

  const cwdEntity = system.find((f) => f.id === CWD)!

  const commandInputRef = useRef<HTMLParagraphElement>(null)

  const [currentCommand, setCurrentCommand] = useState("")
  const [commands, setCommands] = useState<Command[]>([])

  useEffect(() => {
    commandInputRef.current?.focus()
  }, [])

  useEffect(() => {
    type ShortcutHandler = (event: KeyboardEvent) => void

    const autocomplete: ShortcutHandler = (event) => {
      event.preventDefault()
      console.log("should autocomplete")
    }
    const cancelCommand: ShortcutHandler = (event) => {
      event.preventDefault()
      console.log("should cancel")
    }
    const clear: ShortcutHandler = (event) => {
      event.preventDefault()

      commandInputRef.current!.textContent = ""
      setCommands([])
    }
    const submitCommand: ShortcutHandler = (event) => {
      event.preventDefault()

      setCommands((commands) => [
        ...commands,
        {
          id: crypto.randomUUID(),
          result: currentCommand,
          type: "text",
          bashSnapshot: {
            folder: cwdEntity.name,
            sign,
            user,
          },
        },
      ])

      if (currentCommand === "vim") {
        setCommands((commands) => [
          ...commands,
          {
            id: crypto.randomUUID(),
            type: "virtual",
            result: (
              <div
                id="vim"
                className="absolute top-0 right-0 bottom-0 left-0 h-screen w-screen bg-zinc-900 text-zinc-50"
              >
                <h1>Welcome to Doom Emacs</h1>
                <p>
                  Oh!{" "}
                  <strong>
                    yes<span className="text-pink-400">!!!!!</span>
                  </strong>
                </p>
                <button
                  onClick={() => {
                    document.querySelector<HTMLDivElement>(
                      "#vim"
                    )!.style.visibility = "hidden"
                    commandInputRef.current?.focus()
                  }}
                >
                  quit
                </button>
              </div>
            ),
          },
        ])
      }

      if (currentCommand === "clear") {
        clear(event)
      }

      if (currentCommand === "ls") {
        const currentWorkingDirectory = system
          .filter(({ parentId }) => parentId === CWD)
          .sort((a, b) => a.name.localeCompare(b.name))

        setCommands((commands) => [
          ...commands,
          {
            id: crypto.randomUUID(),
            type: "text",
            result: currentWorkingDirectory.map(({ name }) => name).join(" "),
          },
        ])
      }

      if (currentCommand.trimStart().split(" ")[0] === "cd") {
        setCurrentCommand("")
        commandInputRef.current!.textContent = ""
        const [_, path] = currentCommand.trimStart().split(" ")

        const working_directory = system.find(({ id }) => CWD === id)

        if (path.includes("..")) {
          let slashCount = occurrences(path, "..", false)

          let final_destination = null
          let tmp_parentId = working_directory?.parentId

          while (slashCount !== 0) {
            slashCount -= 1

            const parentDir = system.find(({ id }) => tmp_parentId === id)

            if (!parentDir) {
              final_destination = null
              break
            }

            tmp_parentId = parentDir?.parentId

            final_destination = parentDir
          }

          console.log(final_destination)
          if (!final_destination) {
            setCommands((commands) => [
              ...commands,
              {
                id: crypto.randomUUID(),
                type: "text",
                result: `cd: no such file or directory: ${path}`,
              },
            ])
            return
          }

          setCWD(final_destination?.id)
          return
        }

        if (path.includes("/")) {
          // cd Documents/DocumentsNested

          const nestedFolders = path.split("/")
          const newNestedFolders = []

          for (let i = 0; i < nestedFolders.length; i++) {
            const match = system.find(({ name }) => nestedFolders[i] === name)

            if (!match) {
              setCommands((commands) => [
                ...commands,
                {
                  id: crypto.randomUUID(),
                  type: "text",
                  result: `cd: no such file or directory: ${path}`,
                },
              ])
              return
            }

            newNestedFolders.push(match)
          }

          const finalFolder = newNestedFolders.pop()

          if (!finalFolder) {
            setCommands((commands) => [
              ...commands,
              {
                id: crypto.randomUUID(),
                type: "text",
                result: `cd: no such file or directory: ${path}`,
              },
            ])
            return
          }

          setCWD(finalFolder.id)
        }

        console.log({ path })
        const newWorkingDirectory = system.find(
          (directory) => directory.name === path && directory.parentId === CWD
        )

        if (!newWorkingDirectory) {
          setCommands((commands) => [
            ...commands,
            {
              id: crypto.randomUUID(),
              type: "text",
              result: `cd: no such file or directory: ${path}`,
            },
          ])
          return
        }

        setCWD(newWorkingDirectory.id)
      }

      setCurrentCommand("")
      commandInputRef.current!.textContent = ""
    }

    class Shortcuts {
      private KEY_EVENT = "keydown"
      private eventTracker: Record<
        string,
        {
          element: HTMLElement | Window
          callback: (event: KeyboardEvent) => void
        }
      > = {}
      private registeredShortcuts: Array<string> = []

      /**
       * @param {string} shortcut
       * @param {(event: KeyboardEvent) => void} callback
       * @param {HTMLElement | undefined} DOMTarget
       */
      add(
        shortcut: string,
        callback: (event: KeyboardEvent) => void,
        DOMTarget?: HTMLElement | undefined
      ) {
        // Prevents multiple additions of the same shortcut
        if (this.registeredShortcuts.includes(shortcut)) {
          return
        }

        const keyTracker = (event: KeyboardEvent) => {
          const metaWanted: Record<string, boolean> = {
            cmd: false,
            ctrl: false,
            shift: false,
            alt: false,
            meta: false,
          }

          const metaPressed = {
            cmd: event.metaKey,
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            alt: event.altKey,
            meta: event.metaKey,
          }

          const shortcuts = shortcut.split("+")

          let matches = 0

          for (const key of shortcuts) {
            if (key in metaWanted) {
              metaWanted[key] = true
              matches++
              continue
            }

            if (key === event.key.toLowerCase()) {
              matches++
            }
          }

          // If we have matched the shortcut we issue the callback
          if (
            matches === shortcuts.length &&
            metaWanted["cmd"] === metaPressed["cmd"] &&
            metaWanted["ctrl"] === metaPressed["ctrl"] &&
            metaWanted["shift"] === metaPressed["shift"] &&
            metaWanted["alt"] === metaPressed["alt"]
          ) {
            callback(event)
          }
        }

        // Add the event listener
        if (!DOMTarget) {
          window.addEventListener(this.KEY_EVENT as any, keyTracker)
        } else {
          DOMTarget.addEventListener(this.KEY_EVENT as any, keyTracker)
        }

        // Cache the event data so it can be removed later
        this.eventTracker[shortcut] = {
          element: DOMTarget || window,
          callback: keyTracker,
        }

        this.registeredShortcuts.push(shortcut)
      }

      remove(shortcutRaw: string) {
        const shortcut = shortcutRaw.toLowerCase()

        if (this.eventTracker[shortcut]) {
          const { element, callback } = this.eventTracker[shortcut]

          element.removeEventListener(this.KEY_EVENT, callback as any, false)

          delete this.eventTracker[shortcut]
          this.registeredShortcuts = this.registeredShortcuts.filter(
            (s) => s !== shortcut
          )
        }
      }
    }

    const shortcuts = new Shortcuts()

    const TERMINAL_SHORTCUTS = [
      {
        keybind: "enter",
        action: submitCommand,
      },
      {
        keybind: "tab",
        action: autocomplete,
      },
      {
        keybind: "ctrl+c",
        action: cancelCommand,
      },
      {
        keybind: "ctrl+l",
        action: clear,
      },
    ]

    TERMINAL_SHORTCUTS.forEach(({ keybind, action }) => {
      shortcuts.add(keybind, action)
    })

    return () => {
      TERMINAL_SHORTCUTS.forEach(({ keybind }) => {
        shortcuts.remove(keybind)
      })
    }
  }, [CWD, currentCommand, cwdEntity.name, system])

  return (
    <>
      {commands.map((command) => (
        <Command bashSnapshot={command.bashSnapshot} key={command.id}>
          {command.type === "text" ? (
            <Text>{command.result}</Text>
          ) : (
            command.result
          )}
        </Command>
      ))}

      <Command bashSnapshot={{ user, sign, folder: cwdEntity.name }}>
        <div
          ref={commandInputRef}
          contentEditable="plaintext-only"
          className="max-w-[150px] min-w-[50px] outline-0"
          defaultValue={currentCommand}
          onInput={(event) =>
            setCurrentCommand(event.currentTarget.textContent || "")
          }
          suppressContentEditableWarning
        />
      </Command>
    </>
  )
}

export const Terminal = () => {
  return (
    <section>
      <Text>business/ projetos/ estudos/</Text>

      <Command
        bashSnapshot={{
          user: "vitor.gouveia@MT2097-UBUNTU",
          folder: "www/emacs",
          sign: "$",
        }}
      >
        <strong>doom emacs enabled</strong>
      </Command>

      <InputBox />
    </section>
  )
}

function Command({
  children,
  bashSnapshot,
}: {
  bashSnapshot?: {
    user: string
    folder: string
    sign: string
  }
  children: ReactNode
}) {
  return (
    <div className="flex w-full items-center gap-2">
      {bashSnapshot && (
        <>
          <span className="text-white">{bashSnapshot.user}</span>
          <span className="text-yellow-500">~/{bashSnapshot.folder}</span>
          <span className="text-white">{bashSnapshot.sign}</span>
        </>
      )}

      {children}
    </div>
  )
}

function Text({ children }: { children: ReactNode }) {
  return <div className="whitespace-pre">{children}</div>
}
