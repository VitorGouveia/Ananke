"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

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

function InputBox() {
  const user = "vitor.gouveia@MT2097-UBUNTU"
  const folder = "www"
  const sign = "$"

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
            folder,
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
  }, [currentCommand])

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

      <div className="flex w-full items-center gap-2">
        <span className="text-white">{user}</span>
        <span className="text-yellow-500">~/{folder}</span>
        <span className="text-white">{sign}</span>

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
      </div>
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
