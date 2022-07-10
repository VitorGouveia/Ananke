// @ts-check
const { nanoid } = await import("../deps.js");

class ListNode {
  /** @type {ListNode | null} */
  next = null;

  /**
   *
   * @param {import("../types/system").Directory | import("../types/system").File} data
   */
  constructor(data) {
    this.data = data;
  }
}

class LinkedList {
  /** @type {ListNode | null} */
  head = null;

  /**
   *
   * @param {ListNode} head
   */
  constructor(head) {
    this.head = head;
  }
}

/**
 * @param {Omit<import("../types/system").Directory, "createdAt" | "updatedAt" | "children">} props
 * @returns {import("../types/system").Directory & {parentId: string | null}}
 */
function createFolder({ id, name, parentId }) {
  return {
    id,
    parentId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),

    name,
    children: [],
  };
}

/**
 * @param {Omit<import("../types/system").File, "id" | "createdAt" | "updatedAt" | "children">} props
 * @returns {import("../types/system").File}
 */
function createFile({ name, parentId, content, extension, type }) {
  return {
    id: nanoid(),
    parentId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),

    name,
    content,
    extension,
    type,
  };
}

/** shit, i cant do it with trees or linked list because i got no CS degree */

export const DEFAULT_USER_ID = "2";

/** @type {Array<(import("../types/system").Directory | import("../types/system").File) & { parentId: string | null }>} */
export const FILE_STRUCTURE = [
  createFolder({
    name: "home",
    id: "1",
    parentId: null,
  }),
  createFolder({
    name: "jarbas",
    id: DEFAULT_USER_ID,
    parentId: "1",
  }),
  createFolder({
    name: "Documents",
    id: "5",
    parentId: DEFAULT_USER_ID,
  }),
  createFolder({
    name: "DocumentsNested",
    id: "15",
    parentId: "5",
  }),
  createFolder({
    name: "DocumentsUltraNested",
    id: "20",
    parentId: "15",
  }),
  createFolder({
    name: "www",
    id: "6",
    parentId: DEFAULT_USER_ID,
  }),
  createFolder({
    name: ".config",
    id: "3",
    parentId: DEFAULT_USER_ID,
  }),
  createFolder({
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
];
