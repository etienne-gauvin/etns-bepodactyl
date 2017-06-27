import * as EventEmitter from 'events'
import Status from './status'
import StatsHandler from './stats-handler'
import Sentence from './sentence'
import Exercise from './exercise'
import Word from './word'
import InputError from './input-error'
import Letter from './letter'
import Keyboard from './keyboard'
import { IData, data } from './data'
import { CookiesHandler } from './utils'

type SessionEvent = 'sentence-done' | 'letter-correct' | 'error' | 'exercise-changed' | 'sentence-changed'

export default class Session extends EventEmitter {

	public _letter: Letter

	public readonly exercises:Array<Exercise> = []

	public readonly $: Element = document.querySelector('main')

	public readonly $output: Element = this.$.querySelector('.sentence-container')

	private readonly keyboard: Keyboard

	public readonly data: IData = data

	public readonly cookies = CookiesHandler.instance.cookies

	public readonly stats = new StatsHandler(this)

	constructor() {

		super()

		this.keyboard = new Keyboard(this, this.cookies.keyboardVariant)

		this.data.exercises.forEach((exerciseData, id) => {

			this.exercises.push(new Exercise(id, exerciseData, this))

		})

		this.$.querySelector('header .exercise-count').innerHTML = `${this.exercises.length}`

		this.onKeyDown = this.onKeyDown.bind(this)

		window.addEventListener('keydown', this.onKeyDown)

		this.exercise = this.exercises[this.cookies.exercise || 0]

		this.sentence = this.exercise.sentences[this.cookies.sentence || 0]

		console.log(this)

	}

	on(event: SessionEvent, listener: Function): this {

		return super.on(event, listener)

	}

	emit(event: SessionEvent, ...args: any[]): boolean {

		return super.emit(event, ...args)

	}

	onKeyDown(event: KeyboardEvent) {

		let preventDefault = true

		if (event.key === 'Enter' || event.key === ' ') {
			
			this.continue()
		
		} else if (event.key === 'Backspace') {

			this.cancel()

		} else if (event.key === 'PageDown') {

			this.exercise = this.exercise.next

		} else if (event.key === 'PageUp') {

			this.exercise = this.exercise.previous

		} else if (event.key === 'ArrowDown') {

			const nextSentence = this.sentence.next

			this.exercise = nextSentence.exercise
			this.sentence = nextSentence

		} else if (event.key === 'ArrowUp') {

			const prevSentence = this.sentence.previous

			this.exercise = prevSentence.exercise
			this.sentence = prevSentence

		} else if (event.key.match(/^.$/)) {

			this.input(event.key)

		} else {

			preventDefault = false

		}

		if (preventDefault) event.preventDefault()

	}
	
	/**
	 * Valide ou invalide la phrase ou le mot actuel,
	 * ou démarre une nouvelle phrase.
	 */
	continue() {

		console.info('continue')

		this.continueAvailable = false

		if (this.letter.correct !== false) {

			const {exercise, sentence, word} = this

			if (exercise.correct) {

				this.exercise = exercise.next

			} else if (sentence.correct) {

				const nextSentence = sentence.next

				this.exercise = nextSentence.exercise
				this.sentence = nextSentence

			} else if (word.correct) {

				this.word = word.next

			} else {

				console.info('error ("continue" not available)')

				if (this.letter) {

					this.emit('error')

					this.letter.correct = false

					this.cancelAvailable = true

				}

			}

		}

	}

	/**
	 * Recommence le mot actuel si il est invalide
	 */
	cancel() {

		this.cancelAvailable = false

		const letter = this.letter

		if (letter.neutral || ! letter.correct) {

			this.word.neutral = true

			this.letter = this.word.letters[0]

		}

	}

	

	/**
	 * Nouveau caractère
	 */
	input(character: string) {

		this.continueAvailable = false

		if (this.letter.correct !== false) {

			// S'assurer d'avoir un seul caractère
			character = character[0]

			const { letter, word, sentence } = this

			console.log(letter)

			if (letter.neutral && letter.character === character) {

				letter.correct = true

				letter.firstTry = (letter.firstTry === null)

				this.emit('letter-correct', letter)

				if (word.neutral) {

					this.letter = letter.next

				} else if (word.correct) {

					this.letter.focused = false

					this.continueAvailable = true

				}

				console.info('correct')

			} else {

				console.info('error')

				this.emit('error')
				
				letter.correct = false

				this.cancelAvailable = true

			}

		}

	}

	get exercise(): Exercise {

		return this.letter ? this.sentence.exercise : null

	}

	set exercise(exercise: Exercise) {

		this.sentence = exercise.sentences[0]

		this.advice = exercise.advice

		this.$.querySelector('header .exercise-number').innerHTML = `${exercise.id + 1}`

		this.$.querySelector('header .exercise-title').innerHTML = exercise.title
		
		this.$.querySelector('header .sentence-count').innerHTML = `${exercise.sentences.length}`

		this.cookies.exercise = exercise.index

		this.emit('exercise-changed', exercise)

	}

	get sentence(): Sentence {

		return this.letter ? this.word.sentence : null

	}

	set sentence(sentence: Sentence) {

		const previousSentence = this.sentence

		if (previousSentence) {

			console.log('reset')

			// Reset
			previousSentence.words.forEach(word => {		

				word.letters.forEach(letter => {

					letter.firstTry = null

					letter.correct = null

				})
			
			})
			
			this.$output.removeChild(previousSentence.$)

		}


		this.$output.appendChild(sentence.$)

		sentence.updateClassList()

		this.word = sentence.words[0]

		this.$.querySelector('header .sentence-number').innerHTML = `${sentence.id + 1}`

		this.cookies.sentence = sentence.index

		this.emit('sentence-changed')

	}

	get word(): Word {

		return this.letter ? this.letter.word : null

	}

	set word(word: Word) {

		this.letter = word.letters[0]

	}

	get letter(): Letter {

		return this._letter

	}

	set letter(letter: Letter) {

		const oldLetter = this._letter

		this._letter = null

		if (oldLetter) oldLetter.focused = false

		this._letter = letter

		letter.focused = true

	}

	set continueAvailable(available: boolean) {

		const $info = this.$.querySelector('.press-space-info')

		if (available) $info.classList.add('visible')

		else $info.classList.remove('visible')

	}

	set cancelAvailable(available: boolean) {

		const $info = this.$.querySelector('.press-back-info')

		if (available) $info.classList.add('visible')

		else $info.classList.remove('visible')

	}

	set advice(advice: string) {

		this.$.querySelector('.advice').innerHTML = advice || ''

	}

}