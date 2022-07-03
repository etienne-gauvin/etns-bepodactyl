import Session from "./session";
import Letter from "./letter";
import EventEmitter from "./event-emitter";

class Logger extends EventEmitter {
  public static readonly MaxInterval = 5000;

  private lastKeyLogTime = 0;

  private stopFunction: number;

  public correctLetters = 0;

  public errors = 0;

  private count = 0;

  private average: number;

  public constructor() {
    super();
  }

  public logCorrectInput(letter: Letter) {
    console.log(letter);

    if (letter.firstTry) this.correctLetters++;

    let count = this.count;

    let average = this.average;

    const now = +new Date();

    const interval = now - this.lastKeyLogTime;

    if (interval < Logger.MaxInterval) {
      count++;

      if (count > 1) {
        average = average / count * (count - 1) + interval / count;
      } else {
        average = interval;
      }

      this.average = average;
      this.count = count;
    }

    if (this.stopFunction !== null) window.clearTimeout(this.stopFunction);

    this.emit("running");

    this.stopFunction = window.setTimeout(
      () => this.emit("paused"),
      Logger.MaxInterval,
    );

    this.lastKeyLogTime = now;
  }

  public logError() {
    this.errors++;

    this.pause();
  }

  /**
   * La vitesse moyenne en lettres/secondes d'aujourd'hui.
   */
  public get charactersPerSecond(): number {
    return this.count ? 1000 / this.average : 0;
  }

  /**
   * Forcer la pause
   */
  public pause() {
    this.lastKeyLogTime = 0;

    this.emit("paused");
  }
}

export default class StatsHandler {
  private readonly maxCharacterInterval: number = 5;

  private readonly $: Element = document.querySelector(".stats");

  private readonly $success: Element = this.$.querySelector(".success output");

  private readonly $errors: Element = this.$.querySelector(".errors output");

  private readonly $speed: Element = this.$.querySelector(".speed output");

  private logger: Logger = new Logger();

  private readonly session: Session;

  public constructor(session: Session) {
    this.session = session;

    this.updateUI();

    this.createListeners();
  }

  private createListeners() {
    this.logger.on("running", () => this.$speed.classList.remove("paused"));

    this.logger.on("paused", () => this.$speed.classList.add("paused"));

    this.session.on("sentence-done", () => this.logger.pause());

    this.session.on("letter-correct", (letter: Letter) => {
      this.logger.logCorrectInput(letter);

      this.updateUI();
    });

    this.session.on("error", () => {
      this.logger.logError();

      this.updateUI();
    });
  }

  public updateUI() {
    this.$success.innerHTML = `${this.logger.correctLetters}`;

    this.$errors.innerHTML = `${this.logger.errors}`;

    this.$speed.innerHTML = this.logger.charactersPerSecond.toFixed(2);
  }
}
