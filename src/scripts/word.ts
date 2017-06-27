import { getPrevious, getNext } from './utils'
import InputError from './input-error'
import Session from './session'
import Letter from './letter'
import Status from './status'
import Exercise from './exercise'
import Sentence from './sentence'

export default class Word {
	
	private readonly text: string

	public readonly sentence: Sentence

	public readonly $: HTMLElement = document.createElement('span') as HTMLElement
	
	public readonly letters: Array<Letter> = []
	
	public constructor(text, sentence) {
		
		this.sentence = sentence

		this.text = text

		this.$.classList.add('word', 'neutral')

		for (let i = 0; i < text.length; i ++) {

			const letter = new Letter(text[i], this)
			this.letters.push(letter)
			this.$.appendChild(letter.$)

		}

	}

	public get correct(): boolean|null {
		
		const notCorrectLetter = this.letters.find(letter => ! letter.correct)

		return notCorrectLetter ? notCorrectLetter.correct : true
		
	}
	
	public get focused(): boolean {
		
		return this.sentence.exercise.session.word === this

	}
	
	public updateClassList() {

		const correct = this.correct

		if (correct === true) {

			this.$.classList.remove('incorrect', 'neutral')
			this.$.classList.add('correct')

			this.sentence.updateClassList()

		} else if (correct === false) {

			this.$.classList.remove('correct', 'neutral')
			this.$.classList.add('incorrect')

			this.sentence.updateClassList()

		} else {

			this.$.classList.remove('correct', 'incorrect')
			this.$.classList.add('neutral')

		}

		if (this.focused) this.$.classList.add('focused')

		else this.$.classList.remove('focused')

	}
	
	public get neutral(): boolean {
		
		return this.correct === null
		
	}
	
	public set neutral(neutral: boolean) {

		if (! neutral) throw "The attribute 'neutral' cannot be set to false; use 'correct' instead."
		
		this.letters.forEach(letter => letter.neutral = true)

	}

	public get next(): Word {

		return getNext(this.sentence.words, this) || this.sentence.next.words[0] 

	}

	public get previous(): Word {

		const previous = getPrevious(this.sentence.words, this)

		if (previous) {

			return previous

		} else {

			const words = this.sentence.previous.words

			return words[words.length - 1]
			
		}

	}

}