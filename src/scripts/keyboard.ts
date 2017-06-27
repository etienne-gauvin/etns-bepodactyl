import Session from './session'

interface Key {

	plain: string

	shift?: string

	ctrl?: string

	ctrlshift?: string

	variant?: 'typematrix' | 'classic'

	dotted?: boolean,

	$?: HTMLDivElement,

	chars?: string

}

interface Space {

	width: number

	variant?: 'typematrix' | 'classic'

}

export default class Keyboard {

	private readonly Keys: ReadonlyArray<ReadonlyArray<Space|Key>> = [
		[
			{ plain: "$", shift: "#", ctrl: "–", ctrlshift: " " },
			{ plain: "\"", shift: "1", ctrl: "—", ctrlshift: "„" },
			{ plain: "«", shift: "2", ctrl: "<", ctrlshift: "“" },
			{ plain: "»", shift: "3", ctrl: ">", ctrlshift: "”" },
			{ plain: "(", shift: "4", ctrl: "[", ctrlshift: "≤" },
			{ plain: ")", shift: "5", ctrl: "]", ctrlshift: "≥" },
			{ width: 1, variant: 'typematrix' },
			{ plain: "@", shift: "6", ctrl: " ", ctrlshift: " " },
			{ plain: "+", shift: "7", ctrl: " ", ctrlshift: " " },
			{ plain: "-", shift: "8", ctrl: " ", ctrlshift: " " },
			{ plain: "/", shift: "9", ctrl: " ", ctrlshift: " " },
			{ plain: "*", shift: "0", ctrl: " ", ctrlshift: " " },
			{ plain: "=", shift: "°", ctrl: " ", ctrlshift: " " },
			{ plain: "%", shift: "`", ctrl: " ", ctrlshift: " " },
			{ width: 0.67, variant: 'classic' }
		],
		[
			{ width: 1, variant: 'typematrix' },
			{ width: 1.33, variant: 'classic' },
			{ plain: "b", shift: "B", ctrl: "|", ctrlshift: " " },
			{ plain: "é", shift: "É", ctrl: " ", ctrlshift: "˝" },
			{ plain: "p", shift: "P", ctrl: "&", ctrlshift: " " },
			{ plain: "o", shift: "O", ctrl: "œ", ctrlshift: "Œ" },
			{ plain: "è", shift: "È", ctrl: " ", ctrlshift: " " },
			{ width: 1, variant: 'typematrix' },
			{ plain: "^", shift: "!", ctrl: "¡", ctrlshift: " " },
			{ plain: "v", shift: "V", ctrl: " ", ctrlshift: " " },
			{ plain: "d", shift: "D", ctrl: " ", ctrlshift: " " },
			{ plain: "l", shift: "L", ctrl: " ", ctrlshift: " " },
			{ plain: "j", shift: "J", ctrl: " ", ctrlshift: " " },
			{ plain: "z", shift: "Z", ctrl: " ", ctrlshift: " " },
			{ plain: "w", shift: "W", ctrl: " ", ctrlshift: " " },
			{ width: 0.34, variant: 'classic' }
		],
		[
			{ width: 1, variant: 'typematrix' },
			{ width: 1.66, variant: 'classic' },
			{ plain: "a", shift: "A", ctrl: "æ", ctrlshift: "Æ" },
			{ plain: "u", shift: "U", ctrl: "ù", ctrlshift: "Ù" },
			{ plain: "i", shift: "I", ctrl: "¨", ctrlshift: " " },
			{ plain: "e", shift: "E", ctrl: "€", ctrlshift: " " },
			{ plain: ",", shift: ";", ctrl: "’", ctrlshift: " " },
			{ width: 1, variant: 'typematrix' },
			{ plain: "c", shift: "C", ctrl: " ", ctrlshift: " " },
			{ plain: "t", shift: "T", ctrl: " ", ctrlshift: " " },
			{ plain: "s", shift: "S", ctrl: " ", ctrlshift: " " },
			{ plain: "r", shift: "R", ctrl: " ", ctrlshift: " " },
			{ plain: "n", shift: "N", ctrl: " ", ctrlshift: " " },
			{ plain: "m", shift: "M", ctrl: " ", ctrlshift: " " },
			{ plain: "ç", shift: "Ç", ctrl: " ", ctrlshift: " ", variant: 'classic' },
			{ width: 1, variant: 'typematrix' }
		],
		[
			{ width: 1 },
			{ plain: "ê", shift: "Ê", ctrl: " ", ctrlshift: " ", variant: 'classic', dotted: true },
			{ plain: "à", shift: "À", ctrl: "\\", ctrlshift: " " },
			{ plain: "y", shift: "Y", ctrl: "{", ctrlshift: "‘" },
			{ plain: "x", shift: "X", ctrl: "}", ctrlshift: "’" },
			{ plain: ".", shift: ":", ctrl: "…", ctrlshift: "·" },
			{ plain: "k", shift: "K", ctrl: " ", ctrlshift: " " },
			{ width: 1, variant: 'typematrix' },
			{ plain: "'", shift: "?", ctrl: "¿", ctrlshift: " " },
			{ plain: "q", shift: "Q", ctrl: " ", ctrlshift: " " },
			{ plain: "g", shift: "G", ctrl: " ", ctrlshift: " " },
			{ plain: "h", shift: "H", ctrl: " ", ctrlshift: " " },
			{ plain: "f", shift: "F", ctrl: " ", ctrlshift: " " },
			{ plain: "ç", shift: "Ç", ctrl: " ", ctrlshift: " ", variant: 'typematrix' },
			{ width: 1.67, variant: 'classic' },
			{ width: 1, variant: 'typematrix' }
		]
	]

	private readonly keys: Array<Key> = []

	public readonly $: HTMLElement = document.querySelector('.keyboard') as HTMLElement

	private readonly $inputs: { [key: string]: HTMLInputElement } = {
		typematrix: this.$.querySelector('[name="keyboard"][value="typematrix"]') as HTMLInputElement,
		classic: this.$.querySelector('[name="keyboard"][value="classic"]') as HTMLInputElement,
		hidden: this.$.querySelector('[name="keyboard"][value="hidden"]') as HTMLInputElement
	}

	private readonly session: Session

	public constructor(session: Session, variant: 'typematrix' | 'classic' = 'classic') {

		this.session = session

		this.variant = variant

		this.hidden = this.session.cookies.keyboardHidden

		this.$inputs.typematrix.addEventListener('change', event => {
			this.hidden = false
			this.variant = 'typematrix'
		})

		this.$inputs.classic.addEventListener('change', event => {
			this.hidden = false
			this.variant = 'classic'
		})

		this.$inputs.hidden.addEventListener('change', event => this.hidden = ! this.hidden)

		this.Keys.forEach(line => {

			const $line = document.createElement('div')
			$line.className = 'line'

			this.$.appendChild($line)

			line.forEach(keyOrSpace => {

				if ((keyOrSpace as Space).width !== undefined) {

					const space = keyOrSpace as Space
					const $space = document.createElement('div')

					$space.className = 'space'

					if (space.variant) $space.classList.add(space.variant)
					
					$space.style.flexGrow = `${space.width}`

					$line.appendChild($space)

				} else if ((keyOrSpace as Key).plain !== undefined) {

					const key = keyOrSpace as Key
					key.$ = document.createElement('div')
					
					key.$.className = 'key'

					if (key.variant) key.$.classList.add(key.variant)

					key.ctrl = key.ctrl || ''
					key.shift = key.shift || ''
					key.ctrlshift = key.ctrlshift || ''
					key.chars = key.plain + key.ctrl + key.shift + key.ctrlshift

					key.$.setAttribute('data-plain', key.plain)
					key.$.setAttribute('data-ctrl', key.ctrl)
					key.$.setAttribute('data-shift', key.shift)
					key.$.setAttribute('data-ctrlshift', key.ctrlshift)

					$line.appendChild(key.$)

					this.keys.push(key)

				}

			})

		})

		document.addEventListener('keydown', event => {

			if (event.key === 'Control' || event.key === 'AltGr') {

				this.$.classList.add('ctrl')

			}
				
			if (event.key === 'Shift') this.$.classList.add('shift')

			this.keys.forEach(key => {

				if (key.chars.includes(event.key) && event.key !== ' ') key.$.classList.add('down')

			})


		})

		document.addEventListener('keyup', event => {

			if (event.key === 'Control' || event.key === 'AltGr') {

				this.$.classList.remove('ctrl')

			}

			if (event.key === 'Shift') this.$.classList.remove('shift')

			this.keys.forEach(key => {

				if (key.chars.includes(event.key) && event.key !== ' ') key.$.classList.remove('down')

			})

		})

		session.on('exercise-changed', exercise => {

			let availableCharacters = ''

			for (let i = 0; i < session.exercises.length; i ++) {

				if (session.exercises[i] !== exercise) {

					availableCharacters += session.exercises[i].letters

				} else break

			}

			this.highlight(exercise.letters, availableCharacters)

		})

	}

	get hidden(): boolean {

		return this.$.classList.contains('hidden')

	}

	set hidden(hidden: boolean) {

		if (hidden) this.$.classList.add('hidden')
		
		else this.$.classList.remove('hidden')

		if (hidden) {

			this.$inputs.typematrix.checked = false
			this.$inputs.classic.checked = false
			this.$inputs.hidden.checked = true

		} else {

			this.$inputs.hidden.checked = false

		}
		
		this.session.cookies.keyboardHidden = hidden

	}

	get variant(): 'typematrix' | 'classic' {

		return this.$inputs.typematrix.checked ? 'typematrix' : 'classic'

	}

	set variant(variant: 'typematrix' | 'classic') {

		this.$inputs.typematrix.checked = false
		this.$inputs.classic.checked = false
		this.$inputs.hidden.checked = false

		this.$inputs[variant].checked = true

		this.$.classList.remove('typematrix', 'classic')
		this.$.classList.add(variant)

		this.session.cookies.keyboardVariant = variant

	}

	public highlight(characters: string, availableCharacters: string = '') {

		this.keys.forEach(key => {

			key.$.classList.remove('highlight', 'available')

			for (let i = 0; i < availableCharacters.length; i ++) {

				if (key.chars.includes(availableCharacters[i])) {

					key.$.classList.add('available')

					break

				}

			}

			for (let i = 0; i < characters.length; i ++) {

				if (key.chars.includes(characters[i]) && characters[i] !== ' ') {

					key.$.classList.add('highlight', 'available')

				}

			}

		})
		
	}

}