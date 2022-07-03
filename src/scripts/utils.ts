export function getPrevious<T>(collection: T[], item: T): T {
  let previousItem;

  for (let i = 0; i < collection.length; i++) {
    if (item === collection[i]) {
      if (i - 1 >= 0) {
        previousItem = collection[i - 1];
      }

      break;
    }
  }

  return previousItem;
}

export function getNext<T>(collection: T[], item: T): T {
  let nextItem;

  for (let i = 0; i < collection.length; i++) {
    if (item === collection[i]) {
      if (i + 1 < collection.length) {
        nextItem = collection[i + 1];
      }

      break;
    }
  }

  return nextItem;
}

export function getIndex<T>(collection: T[], item: T): number {
  for (let i = 0; i < collection.length; i++) {
    if (item === collection[i]) return i;
  }

  return null;
}

export class CookiesHandler {
  public cookies: Record<string, unknown>;

  private static _instance: CookiesHandler;

  private constructor() {
    this.load();

    window.addEventListener("unload", () => {
      this.save();
    });
  }

  private load() {
    let data;

    try {
      data = JSON.parse(document.cookie);

      if (typeof data !== "object") throw new Error();
    } catch (_e) {
      data = {};
    }

    this.cookies = data;
  }

  private save() {
    document.cookie = JSON.stringify(this.cookies);
  }

  public reset() {
    this.cookies = {};

    this.save();
  }

  public static get instance(): CookiesHandler {
    if (!CookiesHandler._instance) {
      CookiesHandler._instance = new CookiesHandler();
    }

    return CookiesHandler._instance;
  }
}

console.log(CookiesHandler.instance);
