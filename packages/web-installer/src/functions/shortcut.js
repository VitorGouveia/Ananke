"use strict";
// @ts-check

const KEY_EVENT = "keydown";

/**
 * objects should have private properties just like classess:
 * const shortcut = {
 *    #private_prop: 10,
 *    myfunc() {
 *      console.log(this.#private_prop)
 *    }
 * }
 */

export class Shortcuts {
  #eventTracker = [];
  #shortcutExists = [];

  /**
   * @param {string} shortcut
   * @param {(event: KeyboardEvent) => void} callback
   * @param {HTMLElement | undefined} DOMTarget
   */
  add(shortcut, callback, DOMTarget = window) {
    // Prevents multiple additions of the same shortcut
    if (this.#shortcutExists[shortcut] === true) {
      return;
    }

    /**
     *
     * @param {KeyboardEvent} event
     */
    const keyTracker = (event) => {
      var metaWanted = {
        cmd: false,
        ctrl: false,
        shift: false,
        alt: false,
        meta: false,
      };

      var metaPressed = {
        cmd: event.metaKey,
        ctrl: event.ctrlKey,
        shift: event.shiftKey,
        alt: event.altKey,
        meta: event.metaKey,
      };

      const shortcuts = shortcut.split("+");

      let matches = 0;

      for (let i = 0; i < shortcuts.length; i++) {
        if (shortcuts[i] in metaWanted) {
          metaWanted[shortcuts[i]] = true;
          matches++;
        } else {
          if (shortcuts[i] === event.key.toLowerCase()) {
            matches++;
          }
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
        callback(event);
      }
    };

    // Add the event listener
    // @ts-ignore
    DOMTarget.addEventListener(KEY_EVENT, keyTracker);

    // Cache the event data so it can be removed later
    this.#eventTracker[shortcut] = { element: DOMTarget, callback: keyTracker };

    this.#shortcutExists[shortcut] = true;
  }

  /**
   * @param {string} shortcut
   */
  remove(shortcut) {
    shortcut = shortcut.toLowerCase();

    if (this.#eventTracker[shortcut]) {
      var element = this.#eventTracker[shortcut]["element"];
      var callback = this.#eventTracker[shortcut]["callback"];

      element.removeEventListener(KEY_EVENT, callback, false);

      delete this.#eventTracker[shortcut];
      this.#shortcutExists[shortcut] = false;
    }
  }
}
