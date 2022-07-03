export type KeyboardVariant = "typematrix" | "classic";

interface KeyboardItem {
  variant?: KeyboardVariant;
}

export interface KeyDescription extends KeyboardItem {
  isKey: true;

  default: string;

  shift?: string;

  ctrl?: string;

  ctrlshift?: string;

  dotted?: boolean;
}

export interface Space extends KeyboardItem {
  isSpace: true;

  width: number;
}

const isKey = true;
const isSpace = true;

export const KEYS: ReadonlyArray<ReadonlyArray<Space | KeyDescription>> = [
  [
    { isKey, default: "$", shift: "#", ctrl: "–", ctrlshift: " " },
    { isKey, default: '"', shift: "1", ctrl: "—", ctrlshift: "„" },
    { isKey, default: "«", shift: "2", ctrl: "<", ctrlshift: "“" },
    { isKey, default: "»", shift: "3", ctrl: ">", ctrlshift: "”" },
    { isKey, default: "(", shift: "4", ctrl: "[", ctrlshift: "≤" },
    { isKey, default: ")", shift: "5", ctrl: "]", ctrlshift: "≥" },

    { isSpace, width: 1, variant: "typematrix" },

    { isKey, default: "@", shift: "6", ctrl: " ", ctrlshift: " " },
    { isKey, default: "+", shift: "7", ctrl: " ", ctrlshift: " " },
    { isKey, default: "-", shift: "8", ctrl: " ", ctrlshift: " " },
    { isKey, default: "/", shift: "9", ctrl: " ", ctrlshift: " " },
    { isKey, default: "*", shift: "0", ctrl: " ", ctrlshift: " " },
    { isKey, default: "=", shift: "°", ctrl: " ", ctrlshift: " " },
    { isKey, default: "%", shift: "`", ctrl: " ", ctrlshift: " " },

    { isSpace, width: 0.67, variant: "classic" },
  ],
  [
    { isSpace, width: 1, variant: "typematrix" },
    { isSpace, width: 1.33, variant: "classic" },

    { isKey, default: "b", shift: "B", ctrl: "|", ctrlshift: " " },
    { isKey, default: "é", shift: "É", ctrl: " ", ctrlshift: "˝" },
    { isKey, default: "p", shift: "P", ctrl: "&", ctrlshift: " " },
    { isKey, default: "o", shift: "O", ctrl: "œ", ctrlshift: "Œ" },
    { isKey, default: "è", shift: "È", ctrl: " ", ctrlshift: " " },

    { isSpace, width: 1, variant: "typematrix" },

    { isKey, default: "^", shift: "!", ctrl: "¡", ctrlshift: " " },
    { isKey, default: "v", shift: "V", ctrl: " ", ctrlshift: " " },
    { isKey, default: "d", shift: "D", ctrl: " ", ctrlshift: " " },
    { isKey, default: "l", shift: "L", ctrl: " ", ctrlshift: " " },
    { isKey, default: "j", shift: "J", ctrl: " ", ctrlshift: " " },
    { isKey, default: "z", shift: "Z", ctrl: " ", ctrlshift: " " },
    { isKey, default: "w", shift: "W", ctrl: " ", ctrlshift: " " },

    { isSpace, width: 0.34, variant: "classic" },
  ],
  [
    { isSpace, width: 1, variant: "typematrix" },
    { isSpace, width: 1.66, variant: "classic" },

    { isKey, default: "a", shift: "A", ctrl: "æ", ctrlshift: "Æ" },
    { isKey, default: "u", shift: "U", ctrl: "ù", ctrlshift: "Ù" },
    { isKey, default: "i", shift: "I", ctrl: "¨", ctrlshift: " " },
    { isKey, default: "e", shift: "E", ctrl: "€", ctrlshift: " " },
    { isKey, default: ",", shift: ";", ctrl: "’", ctrlshift: " " },

    { isSpace, width: 1, variant: "typematrix" },

    { isKey, default: "c", shift: "C", ctrl: " ", ctrlshift: " " },
    { isKey, default: "t", shift: "T", ctrl: " ", ctrlshift: " " },
    { isKey, default: "s", shift: "S", ctrl: " ", ctrlshift: " " },
    { isKey, default: "r", shift: "R", ctrl: " ", ctrlshift: " " },
    { isKey, default: "n", shift: "N", ctrl: " ", ctrlshift: " " },
    { isKey, default: "m", shift: "M", ctrl: " ", ctrlshift: " " },
    {
      isKey,
      default: "ç",
      shift: "Ç",
      ctrl: " ",
      ctrlshift: " ",
      variant: "classic",
    },

    { isSpace, width: 1, variant: "typematrix" },
  ],
  [
    { isSpace, width: 1 },

    {
      isKey,
      default: "ê",
      shift: "Ê",
      ctrl: " ",
      ctrlshift: " ",
      variant: "classic",
      dotted: true,
    },
    { isKey, default: "à", shift: "À", ctrl: "\\", ctrlshift: " " },
    { isKey, default: "y", shift: "Y", ctrl: "{", ctrlshift: "‘" },
    { isKey, default: "x", shift: "X", ctrl: "}", ctrlshift: "’" },
    { isKey, default: ".", shift: ":", ctrl: "…", ctrlshift: "·" },
    { isKey, default: "k", shift: "K", ctrl: " ", ctrlshift: " " },

    { isSpace, width: 1, variant: "typematrix" },

    { isKey, default: "'", shift: "?", ctrl: "¿", ctrlshift: " " },
    { isKey, default: "q", shift: "Q", ctrl: " ", ctrlshift: " " },
    { isKey, default: "g", shift: "G", ctrl: " ", ctrlshift: " " },
    { isKey, default: "h", shift: "H", ctrl: " ", ctrlshift: " " },
    { isKey, default: "f", shift: "F", ctrl: " ", ctrlshift: " " },
    {
      isKey,
      default: "ç",
      shift: "Ç",
      ctrl: " ",
      ctrlshift: " ",
      variant: "typematrix",
    },

    { isSpace, width: 1.67, variant: "classic" },
    { isSpace, width: 1, variant: "typematrix" },
  ],
];
