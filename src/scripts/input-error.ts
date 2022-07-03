export default class InputError extends Error {
  public readonly correctCharacter: string;

  constructor(correctCharacter?: string) {
    super();

    this.correctCharacter = correctCharacter[0];
  }
}
