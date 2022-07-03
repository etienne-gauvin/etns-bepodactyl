import { getIndex, getNext, getPrevious } from "./utils";
import Word from "./word";
import Exercise from "./exercise";

export default class Sentence {
  public readonly id: number;

  public readonly exercise: Exercise;

  public readonly words: Word[] = [];

  public readonly $: Element = document.createElement("p");

  public constructor(id: number, text: string, exercise: Exercise) {
    this.id = id;

    this.exercise = exercise;

    this.$.classList.add("sentence");

    const wordStrings = text.split(" ");

    wordStrings.forEach((wordString, i) => {
      const word = new Word(wordString, this);
      this.words.push(word);
      this.$.appendChild(word.$);

      if (i < wordStrings.length - 1) {
        const $space = document.createElement("span");
        $space.appendChild(document.createTextNode(" "));
        $space.classList.add("space");

        this.$.appendChild($space);
      }
    });
  }

  public get correct(): boolean | null {
    const notCorrectWord = this.words.find((word) => !word.correct);

    return notCorrectWord ? notCorrectWord.correct : true;
  }

  public updateClassList() {
    const correct = this.correct;

    if (this.$.parentElement) {
      if (correct === true) {
        this.$.parentElement.classList.add("correct");
      } else {
        this.$.parentElement.classList.remove("correct");
      }
    }
  }

  public get next(): Sentence {
    return getNext(this.exercise.sentences, this) ||
      this.exercise.next.sentences[0];
  }

  public get previous(): Sentence {
    const previous = getPrevious(this.exercise.sentences, this);

    if (previous) {
      return previous;
    } else {
      const sentences = this.exercise.previous.sentences;

      return sentences[sentences.length - 1];
    }
  }

  public get index(): number {
    return getIndex(this.exercise.sentences, this);
  }
}
