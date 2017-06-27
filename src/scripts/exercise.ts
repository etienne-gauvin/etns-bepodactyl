import { getPrevious, getNext, getIndex } from './utils'
import Session from './session'
import Sentence from './sentence'
import Word from './word'
import InputError from './input-error'
import Status from './status'
import Letter from './letter'
import { IExerciseData } from './data'

export default class Exercise {

	public readonly id: number

	public readonly session: Session

	public readonly sentences: Array<Sentence> = []

	public readonly letters: string

	public readonly title: string

	public readonly advice: string

	public constructor(id: number, data: IExerciseData, session: Session) {

		this.id = id

		this.session = session

		this.title = data.title
		
		this.letters = data.letters
		
		this.advice = data.advice !== null ? this.session.data.advices[data.advice] : null
		
		data.sentences.forEach((text, id) => this.sentences.push(new Sentence(id, text, this)))

	}

	public get correct(): boolean|null {
		
		const notCorrectSentence = this.sentences.find(sentence => ! sentence.correct)

		return notCorrectSentence ? notCorrectSentence.correct : true
		
	}

	public get next(): Exercise {

		return getNext(this.session.exercises, this) || this.session.exercises[0]

	}

	public get previous(): Exercise {

		return getPrevious(this.session.exercises, this) || this.session.exercises[this.session.exercises.length - 1]

	}

	public get index(): number {

		return getIndex(this.session.exercises, this)

	}

}