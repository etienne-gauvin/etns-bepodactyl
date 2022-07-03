import Exercise from "./exercise";
import { KeyboardVariant, KEYS } from "./keyboard-config";
import Session from "./session";

export enum KeyboardDisplay {
  TypeMatrix = "typematrix",
  Classic = "classic",
  Hidden = "hidden",
}

interface Key {
  default: string;

  shift: string;

  ctrl: string;

  ctrlshift: string;

  dotted: boolean;

  $: HTMLDivElement;

  variant?: KeyboardVariant;

  chars: string;
}

export default class Keyboard {
  private readonly keys: Key[] = [];

  private readonly $inputs: Record<
    KeyboardDisplay,
    HTMLInputElement
  > = {
    typematrix: this.$.querySelector(
      '[name="keyboard"][value="typematrix"]',
    ) as HTMLInputElement,
    classic: this.$.querySelector(
      '[name="keyboard"][value="classic"]',
    ) as HTMLInputElement,
    hidden: this.$.querySelector(
      '[name="keyboard"][value="hidden"]',
    ) as HTMLInputElement,
  };

  public constructor(
    public readonly $: HTMLElement,
    private readonly session: Session,
    variant: KeyboardDisplay,
  ) {
    this.session = session;

    this.variant = variant;

    this.hidden = !!this.session.cookies.keyboardHidden;

    this.$inputs.typematrix.addEventListener("change", () => {
      this.hidden = false;
      this.variant = KeyboardDisplay.TypeMatrix;
    });

    this.$inputs.classic.addEventListener("change", () => {
      this.hidden = false;
      this.variant = KeyboardDisplay.Classic;
    });

    this.$inputs.hidden.addEventListener(
      "change",
      () => this.hidden = !this.hidden,
    );

    KEYS.forEach((line) => {
      const $line = document.createElement("div");
      $line.className = "line";

      this.$.appendChild($line);

      line.forEach((keyOrSpace) => {
        if ("isSpace" in keyOrSpace) {
          const space = keyOrSpace;
          const $space = document.createElement("div");

          $space.className = "space";

          if (space.variant) $space.classList.add(space.variant);

          $space.style.flexGrow = `${space.width}`;

          $line.appendChild($space);
        } else if ("isKey" in keyOrSpace) {
          const key: Key = {
            default: keyOrSpace.default ?? "",
            ctrl: keyOrSpace.ctrl ?? "",
            shift: keyOrSpace.shift ?? "",
            ctrlshift: keyOrSpace.ctrlshift ?? "",
            dotted: keyOrSpace.dotted ?? false,
            variant: keyOrSpace.variant,
            $: document.createElement("div"),
            chars: "",
          };

          key.$.className = "key";

          if (key.variant) key.$.classList.add(key.variant);

          key.chars = [key.default, key.ctrl, key.shift, key.ctrlshift].filter(
            (c) => c,
          ).join('');

          key.$.setAttribute("data-plain", key.default);
          key.$.setAttribute("data-ctrl", key.ctrl);
          key.$.setAttribute("data-shift", key.shift);
          key.$.setAttribute("data-ctrlshift", key.ctrlshift);

          $line.appendChild(key.$);

          this.keys.push(key);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Control" || event.key === "AltGr") {
        this.$.classList.add("ctrl");
      }

      if (event.key === "Shift") this.$.classList.add("shift");

      this.keys.forEach((key) => {
        if (key.chars.includes(event.key) && event.key !== " ") {
          key.$.classList.add("down");
        }
      });
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Control" || event.key === "AltGr") {
        this.$.classList.remove("ctrl");
      }

      if (event.key === "Shift") this.$.classList.remove("shift");

      for (const key of this.keys) {
        if (key.chars.includes(event.key) && event.key !== " ") {
          key.$.classList.remove("down");
        }
      }
    });

    session.on("exercise-changed", (currentExercise: Exercise) => {
      const lettersOfPreviousExercises: string = session.exercises
        .slice(0, session.exercises.indexOf(currentExercise))
        .map((exercise) => exercise.letters)
        .join('');

      this.highlight(currentExercise.letters, lettersOfPreviousExercises);
    });
  }

  get hidden(): boolean {
    return this.$.classList.contains("hidden");
  }

  set hidden(hidden: boolean) {
    if (hidden) this.$.classList.add("hidden");
    else this.$.classList.remove("hidden");

    if (hidden) {
      this.$inputs.typematrix.checked = false;
      this.$inputs.classic.checked = false;
      this.$inputs.hidden.checked = true;
    } else {
      this.$inputs.hidden.checked = false;
    }

    this.session.cookies.keyboardHidden = hidden;
  }

  get variant(): KeyboardDisplay {
    if (this.$inputs.typematrix.checked) {
      return KeyboardDisplay.TypeMatrix;
    } else if (this.$inputs.classic.checked) {
      return KeyboardDisplay.Classic;
    } else {
      return KeyboardDisplay.Hidden;
    }
  }

  set variant(variant: KeyboardDisplay) {
    this.$inputs.typematrix.checked = false;
    this.$inputs.classic.checked = false;
    this.$inputs.hidden.checked = false;

    this.$inputs[variant].checked = true;

    this.$.classList.remove("typematrix", "classic");
    this.$.classList.add(variant);

    this.session.cookies.keyboardVariant = variant;
  }

  public highlight(characters: string, availableCharacters = "") {
    console.log('highlight', {characters, availableCharacters})
    for (const key of this.keys) {
      key.$.classList.remove("highlight", "available");

      for (const char of availableCharacters) {
        if (key.chars.includes(char)) {
          key.$.classList.add("available");

          break;
        }
      }

      for (const char of characters) {
        if (key.chars.includes(char) && char !== " ") {
          key.$.classList.add("highlight", "available");
        }
      }
    }
  }
}
