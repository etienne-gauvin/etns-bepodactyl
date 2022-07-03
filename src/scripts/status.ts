export default class Status {
  private value: string;

  private static all: { [key: string]: Status } = {};

  private constructor(value: string) {
    this.value = value;

    Status.all[value] = this;
  }

  static Neutral: Status = new Status("neutral");
  static Current: Status = new Status("current");
  static Correct: Status = new Status("correct");
  static Incorrect: Status = new Status("incorrect");

  public toString(): string {
    return this.value;
  }

  public static fromString(value: string) {
    return Status.all[value];
  }
}
