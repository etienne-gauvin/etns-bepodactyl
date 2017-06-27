import { getPrevious, getNext } from './utils'
import Session from './session'
import Status from './status'
import InputError from './input-error'
import Word from './word'

export default class Letter {

	private _correct: boolean|null = null

	public readonly word: Word

	public readonly character: string

	public readonly $: HTMLElement = document.createElement('span') as HTMLElement
	
	public firstTry: boolean = null
	
	public constructor(character: string, word: Word) {
		
		this.character = character

		this.word = word
		
		this.$.classList.add('letter', 'neutral')
		this.$.appendChild(document.createTextNode(character))

	}

	public get correct(): boolean|null {
		
		return this._correct
		
	}
	
	public set correct(correct: boolean|null) {

		if (correct === true) {

			this.$.classList.remove('incorrect', 'neutral')
			this.$.classList.add('correct')

		} else if (correct === false) {

			this.$.classList.remove('correct', 'neutral')
			this.$.classList.add('incorrect')

		} else {

			this.$.classList.remove('correct', 'incorrect')
			this.$.classList.add('neutral')

		}

		this._correct = correct

		this.word.updateClassList()

	}
	
	public get neutral(): boolean {
		
		return this._correct === null
		
	}
	
	public set neutral(neutral: boolean) {
		
		if (! neutral) throw "The attribute 'neutral' cannot be set to false; use 'correct' instead."
		
		this.correct = null

	}
	
	public get focused(): boolean {
		
		return this.$.classList.contains('focused')
		
	}
	
	public set focused(focused: boolean) {
		
		if (focused) this.$.classList.add('focused')

		else this.$.classList.remove('focused')

		this.word.updateClassList()

	}
	
	public get next(): Letter {

		return getNext(this.word.letters, this) || this.word.next.letters[0] 

	}

	public get previous(): Letter {

		const previous = getPrevious(this.word.letters, this)

		if (previous) {

			return previous

		} else {

			const letters = this.word.previous.letters

			return letters[letters.length - 1]
			
		}

	}

}