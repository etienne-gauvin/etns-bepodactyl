/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const data = {
    "advices": [
        "Pour frapper les majuscules, utiliser l'auriculaire de la main opposée à celle qui tape la lettre. Ainsi, on doit utiliser l'auriculaire droit pour les majuscules AUIE et l'auriculaire gauche pour NRST.",
        "Pour le M et le Z, l'auriculaire droit doit s'étendre hors de sa colonne. La virgule et le É doivent être fait avec l’index gauche.",
        "Le K et le point se font avec la main gauche. L'apostrophe et le Q se font avec la main droite. L'apostrophe nécessite d'étirer un peu plus l'index. Attention à ne pas confondre les deux ! Le principe est toujours le même :  la précision est bien plus importante que la rapidité.",
        "Attention, c’est bien l’annulaire gauche qui doit être utilisé pour faire le « Y » !",
        "L'accent circonflexe (en dessous du point d'exclamation) et le tréma (en AltGr+I) doivent être tapés seuls. Vous ne verrez rien, mais l'accent apparaîtra sur la voyelle tapée ensuite. Un subtilité pour Ê, qui peut être obtenu de deux façons :  par la 105ème touche du clavier Ê, ou avec l'accent circonflexe, puis le E.",
        "Une petite difficulté supplémentaire pour les deux points, le point-virgule, le point d'exclamation et le point d'interrogation qui doivent tous être précédés d'une espace insécable (représentée ici par « ␣ »), obtenue en maintenant la touche majuscule durant la frappe de l'espace. Conserver ensuite la touche majuscule appuyée pour la frappe du signe de ponctuation, qui est justement en majuscule lui-aussi. Ne pas oublier de relâcher avant la frappe de l'espace suivante.",
        "Une petite difficulté supplémentaire pour les guillemets ouverts qui doivent être suivis d'une espace insécable, ainsi que pour les guillemets fermés qui doivent être précédés d'une espace insécable, obtenue en maintenant la touche majuscule durant la frappe de l'espace.",
        "En guise de conclusion, voici des exercices où, à chaque ligne, on trouve toutes les lettres de l’alphabet :  des pangrammes."
    ],
    "exercises": [
        {
            "title": "E, T, A, N (index et auriculaires)",
            "letters": "etanETAN",
            "sentences": [
                "et et et et et et et te te te te te te te",
                "tee tee ette ette et et teet",
                "an an an an an an an na na na na na na na",
                "anna nana anan anna nana anan",
                "en en en en ta ta ta ta ta ne ne ne ne ne",
                "ane tate tante nana tata tete",
                "tata et annette tannent ta tante",
                "natte tentante et tente attenante",
                "annette et tata tentent attentat en tente"
            ]
        },
        {
            "title": "I et S (majeurs)",
            "letters": "isIS",
            "sentences": [
                "ss ii ss ii si si si is is is",
                "isis et sissi sises",
                "tes siestes et ses tasses",
                "titi sieste et sissi tisse",
                "sainte anne atteint ses antiennes",
                "annette assiste insiste et atteste",
                "satan est sienne si ta tante se tait",
                "tante annette insistait et teintait sa tisane",
                "sissi nantaise et titi sataniste naissent nantis",
                "ni ses antennes ni ses tasses ne tentaient sa tante",
                "annie est assise et anais a ses assiettes et ses tasses",
                "anastasie tissait sa taie en satin et anne assistait assise en se taisant"
            ]
        },
        {
            "title": "U et R (annulaires)",
            "letters": "urUR",
            "sentences": [
                "ur ur ur ru ru ru",
                "rue rue rue eur eur eur eur",
                "sanie sur un nanti est inane",
                "sirius statue et nina sursaute",
                "tu attises sans tester tes risettes",
                "un narrateur rit et renie sa nature",
                "tu essaies un instant et tu es saisi",
                "tu eus une transe et tu te ratatinas",
                "un statut saint unirait ses instituts",
                "une eau saine et sans nitrates rassure",
                "ses saisies insanes initient sa retraite",
                "une instit tunisienne se tait en entrant",
                "nina ruse et ne susurre rien au russe assis",
                "un interne ruant sur rue ne saurait user sa rate",
                "un artiste teint ses tartines et rature ses raies",
                "en ratissant sa teinturerie sirius sent sa nature inerte",
                "un assaut retentissant terrassa un tsar et instaura une terreur",
                "un raisin rassis sustenterait un sarrasin sinistre et une tunisienne nantie en nuisette"
            ]
        },
        {
            "title": "V et O (index)",
            "letters": "voVO",
            "advice": 0,
            "sentences": [
                "vo vo vo ov ov ov",
                "Nous envions votre aviation souveraine",
                "Un toit en soie sur une tasse toute neuve",
                "Un virtuose novateur et avenant renversait nos vies",
                "Nous arriverons vers Tours via une autoroute toute neuve",
                "Un visionnaire vivote et entrevoit un tournevis novateur",
                "Nous savonnerons notre ventouse et retournerons notre veste",
                "Une voisine a vu un avion en ivoire et une voiture innovante",
                "Nous arriverons en vitesse et nous nous enivrerons en vos vins",
                "On va vers une aventure vaseuse si on avoue avoir vu son invention"
            ]
        },
        {
            "title": "P et D (majeurs)",
            "letters": "pdPD",
            "sentences": [
                "Nous nous disputons pour des prunes",
                "Un papa panda divin parade au paradis",
                "Nous parviendrons en Inde avant votre venue",
                "Nous adoptons votre point de vue sur notre patriote",
                "Un artiste peintre en peine a perdu de vue son inspiration",
                "Un oiseau de proie est souvent suspendu au dessus de terre",
                "Nous adoptons une attitude positive et nions avoir pris du poids",
                "Votre titre de transport apatride vous sera repris avant de sortir de notre avion",
                "Nous avons pour ainsi dire perdu notre inspiration et repoussons notre dispensaire"
            ]
        },
        {
            "title": "É et L (annulaires)",
            "letters": "élÉL",
            "sentences": [
                "Ils étaient pourtant anéantis",
                "Le ré et le la ont été entendus",
                "Il a idéalisé son idole antirévolutionnaire",
                "Un oiseau a des ailes et en réalité les avions aussi",
                "Une eau désaltérante est la plus utile durant un été étoilé",
                "Les dépolluants ont évolué et peuvent délivrer une eau saine",
                "Nous avons pu altérer les évolutions prévues de notre Étoile en étain",
                "Le député et le président ont été élus suite au vote sans surprise de la droite",
                "Alerté par la radio un adulte daltonien a pu délivrer le latéral droit de Lens",
                "Une révolutionnaire esseulée est délaissée par les prisonniers dépassés par les événements"
            ]
        },
        {
            "title": "B et J (auriculaires), C (index droit)",
            "letters": "bjBJcC",
            "sentences": [
                "Je blablate beaucoup du jubilé de Platini",
                "Je jubile devant une bien belle bijouterie",
                "Je vous dis bienvenue dans le Libre via bépo",
                "Bien entendu je vais juste jouer au jeune toubib",
                "Nous balisons les jalons des joutes de javelot et de bouée",
                "Bébé a avalé son jus de baies puis a beaucoup bavé",
                "Le barbu a brutalisé un juré et la réponse du tribunal était terrible",
                "Un bretteur battu a troublé les badauds obnubilés par son adresse au sabre",
                "Jules abjura les jeunes et éblouit ses subordonnés débordants de jalousie"
            ]
        },
        {
            "title": ", et È (index gauche), M et Z (auriculaire droit)",
            "letters": ",èÈmzMZ",
            "advice": 1,
            "sentences": [
                "Le combat semble impossible, mais le succès demeurera une victoire intemporelle",
                "Zou, il est temps de partir",
                "Bleu, comme le ciel azuréen",
                "La moutarde lui monte au nez",
                "Vous devez votre ceinture abdominale",
                "Un nez, un pic, un cap, une péninsule",
                "Un zombie disparu et tout est dépeuplé",
                "Libérez ce prisonnier insolent et malade",
                "Vous entamez cette procédure très attentivement",
                "Vous acclamerez sans problème ces émois juvéniles",
                "Une émeute a éclaté, mais vous avez amnistié les meneurs",
                "En Amazonie, les amateurs de meubles en acajou se réjouissent",
                "Justement, vous pouvez ajuster cet alambic avec votre nez",
                "Vous vous débarrassez de cet animal empaillé dont le nez empestait",
                "Entre zèbres et zébus, la Zambie demeure accueillante",
                "Treize litres de mazout déversés dans la mer, et le vizir est alarmé",
                "Vous lézardez au son de cet air de jazz",
                "Vous venez de commander votre seizième pizza, elle sera très moelleuse",
                "Ce zélote zozote mais reste zen en zippant son blouson",
                "Les trapézistes volent, une dizaine de zèbres parcourent la piste, et douze lézards ramassent les restes"
            ]
        },
        {
            "title": "Ç et W",
            "letters": "çwÇW",
            "sentences": [
                "Les edelweiss poussent en altitude",
                "Lawrence est un darwiniste convaincu",
                "Le journaliste a interviewé le steward wallon",
                "Avec une jupe en tweed et un sweat, je suis parée pour assister au spectacle de clowns",
                "En ensemençant maintenant, nous aurons un beau jardin au printemps",
                "La rançon demandée est désarçonnante",
                "Il passait inaperçu et demeurait donc insoupçonnable",
                "Nous vous avons aperçus puis reçus, comme ça, sans attendre",
                "Le caleçon du maçon se coinça dans un escalier en colimaçon mal conçu, alors il menaça de poinçonner son remplaçant déçu",
                "Elle a conçu un brownie tout simplement sublime",
                "Dans ce western, les cavaliers sont souvent désarçonnés"
            ]
        },
        {
            "title": "K . ' et Q (index)",
            "letters": "kK.'qQ",
            "advice": 2,
            "sentences": [
                "J'ai la joie d'utiliser un point.",
                "L'accueil d'une douzaine d'émirs est crucial.",
                "Il s'est présenté tel quel.",
                "Je joue tandis qu'il travaille.",
                "L'aéronautique est souvent critiquée mais demeure un domaine de compétence.",
                "Un enquiquineur de première classe.",
                "Je viens d'acquérir un kiwi.",
                "C'est anecdotique, mais l'acoustique de cette salle est remarquable.",
                "Il a empaqueté son anorak et l'a embarqué pour Astrakan.",
                "Après le cours de karaté, un bon cake te requinquera.",
                "Le judoka qui est en kaki teste ton kaléidoscope.",
                "Un cocktail suivra la kermesse. Les basketteurs seront présents, ainsi que les quelques rockeurs.",
                "Après quelques vodkas, je serai partant pour un jerk et un rock endiablés.",
                "J'ai acquis une belle aquarelle d'antiquaire, que je mettrai près de mon aquarium.",
                "C'est dans la zone équatoriale que j'ai pu pratiquer l'équitation.",
                "Cet ecclésiastique éloquent évoquait une escroquerie sans équivoque.",
                "Je m'inquiète de ce qu'impliquent ces quatorze quatrains."
            ]
        },
        {
            "title": "X et G (majeurs)",
            "letters": "xgXG",
            "sentences": [
                "J'exagère sans doute, mais l'état de mon gazon s'aggrave.",
                "Les Anglais s'agglutinent dans cette agglomération.",
                "Lorsqu'elle angoisse, elle ingurgite et engloutit des quantités astronomiques.",
                "Nous avons obtenu l'agrément pour l'agrandissement de notre maison et l'aménagement de l'annexe.",
                "L'agence nous a conseillé l'agriculture, mais l'élevage de grenouilles pourrait nous nuire.",
                "Le matin, on conseille un bon verre de jus d'orange ou de tout autre agrume.",
                "La gourmandise n'aide pas pour maigrir.",
                "J'enrage car l'enregistrement que j'avais programmé a raté.",
                "Mon garçon est ambidextre.",
                "Avec mes index et mes majeurs, j'indexe des données qui avaient été annexées."
            ]
        },
        {
            "title": "Y et H (annulaires)",
            "letters": "yhYH",
            "advice": 3,
            "sentences": [
                "J'espère hypnotiser les sénateurs avec les chrysanthèmes disséminés dans l'hémicycle.",
                "Les polytechniciens aussi ont besoin de s'hydrater.",
                "C'est avec du rythme que le saxophoniste et le psychiatre joueur de synthé pourront se synchroniser.",
                "Un asthmatique en crise présente une inspiration maximale qui abaisse le diaphragme, repousse les abdominaux et gonfle le thorax.",
                "Je suis chez ce cher Serge, cherchant des chers cierges, assis sur des chers sièges.",
                "Le chiche, son chicha et son chien sont souvent chez Sanson ou chez Charles sans se soucier de sa sécheuse sèche."
            ]
        },
        {
            "title": "À et F (auriculaires)",
            "letters": "àfÀF",
            "sentences": [
                "Riri, Fifi et Loulou.",
                "Pif, paf, pouf.",
                "Et voilà, on a fait le tour de toutes les touches.",
                "Le bépo, c'est facile, finalement.",
                "À partir de maintenant, il suffira de faire quelques derniers petits efforts."
            ]
        },
        {
            "title": "Accents morts ^ et ¨ (Ê, Î, Û, Â, Ô, Ï, Ä)",
            "letters": "^¨êÊ",
            "advice": 4,
            "sentences": [
                "Être ou ne pas être.",
                "Peut-être bien que oui.",
                "Il paraît qu'un bon feu dans l'âtre contribue au bien-être.",
                "Il est sûr et certain.",
                "La brebis a dû paître à côté.",
                "La laïcité peut être ambiguë.",
                "Le canoë est emporté dans un maelström.",
                "C'est la belle nuit de Noël.",
                "Ma trisaïeule hébraïque raffole de l'aïoli.",
                "Les paranoïaques poussent des cris suraigüs."
            ]
        },
        {
            "title": "Touches en AltGr (Ù, Œ, Æ)",
            "letters": "ùœæÙŒÆ",
            "sentences": [
                "Où que soit cet œuf.",
                "Qui vole un œuf, vole un bœuf.",
                "Curriculum Vitæ.",
                "Et cætera.",
                "Lætitia et Éric sont arrivés ex æquo.",
                "Où qu'il soit, il y est.",
                "Je ne sais où ni quand."
            ]
        },
        {
            "title": "Tiret et point d'interrogation (avec espace insécable)",
            "letters": "-?",
            "advice": 5,
            "sentences": [
                "Les chaussettes de l'archi-duchesse sont-elles sèches, archi-sèches ?",
                "Où est-il ?",
                "Que se passe-t-il ?",
                "Qu'est-il arrivé ?",
                "Qu'y a-t-il ?",
                "Peut-être est-il trop tard."
            ]
        },
        {
            "title": "Ponctuation double ( :  !) et espace insécable",
            "letters": ": !",
            "advice": 5,
            "sentences": [
                "Et revoilà la sous-préfète !",
                "La voilà  elle arrive !"
            ]
        },
        {
            "title": "Parenthèses",
            "letters": "()",
            "sentences": [
                "World Wide Web (www)"
            ]
        },
        {
            "title": "Guillemets",
            "letters": "«»",
            "advice": 6,
            "sentences": [
                "la Haute Autorité pour la Diffusion des Œuvres et la Protection des Droits sur Internet ou « HADOPI »"
            ]
        },
        {
            "title": "Pangrammes",
            "letters": "",
            "advice": 7,
            "sentences": [
                "Vif PDG mentor, exhibez la squaw jockey.",
                "Juge, flambez l'exquis patchwork d'Yvon.",
                "Vif juge, trempez ce blond whisky aqueux.",
                "Fripon, mixez l'abject whisky qui vidange.",
                "Buvez de ce whisky que le patron juge fameux.",
                "Portez ce vieux whisky au juge blond qui fume.",
                "Jugez qu'un vieux whisky blond pur malt fonce.",
                "Faux kwachas ? Quel projet de voyage zambien !",
                "Fougueux, j'enivre la squaw au pack de beau zythum.",
                "Ketch, yawl, jonque flambant neuve… jugez des prix !",
                "Vieux pelage que je modifie :  breitschwanz ou yak ?",
                "Prouvez, beau juge, que le fameux sandwich au yak tue.",
                "Voyez ce jeu exquis wallon, de graphie en kit mais bref."
            ]
        },
        {
            "title": "Pangrammes accentués",
            "letters": "",
            "sentences": [
                "Perchez dix, vingt woks. Qu'y flambé-je ?",
                "Le moujik équipé de faux breitschwanz voyage.",
                "Kiwi fade, aptéryx, quel jambon vous gâchez !",
                "Voyez le brick géant que j'examine près du wharf.",
                "Bâchez la queue du wagon-taxi avec les pyjamas du fakir.",
                "Mon pauvre zébu ankylosé choque deux fois ton wagon jaune.",
                "Voix ambiguë d'un cœur qui, au zéphyr, préfère les jattes de kiwis."
            ]
        }
    ]
};
exports.data = data;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = __webpack_require__(10);
const stats_handler_1 = __webpack_require__(9);
const exercise_1 = __webpack_require__(2);
const keyboard_1 = __webpack_require__(3);
const data_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(8);
class Session extends EventEmitter {
    constructor() {
        super();
        this.exercises = [];
        this.$ = document.querySelector('main');
        this.$output = this.$.querySelector('.sentence-container');
        this.data = data_1.data;
        this.cookies = utils_1.CookiesHandler.instance.cookies;
        this.stats = new stats_handler_1.default(this);
        this.keyboard = new keyboard_1.default(this, this.cookies.keyboardVariant);
        this.data.exercises.forEach((exerciseData, id) => {
            this.exercises.push(new exercise_1.default(id, exerciseData, this));
        });
        this.$.querySelector('header .exercise-count').innerHTML = `${this.exercises.length}`;
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDown);
        this.exercise = this.exercises[this.cookies.exercise || 0];
        this.sentence = this.exercise.sentences[this.cookies.sentence || 0];
        console.log(this);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    onKeyDown(event) {
        let preventDefault = true;
        if (event.key === 'Enter' || event.key === ' ') {
            this.continue();
        }
        else if (event.key === 'Backspace') {
            this.cancel();
        }
        else if (event.key === 'PageDown') {
            this.exercise = this.exercise.next;
        }
        else if (event.key === 'PageUp') {
            this.exercise = this.exercise.previous;
        }
        else if (event.key === 'ArrowDown') {
            const nextSentence = this.sentence.next;
            this.exercise = nextSentence.exercise;
            this.sentence = nextSentence;
        }
        else if (event.key === 'ArrowUp') {
            const prevSentence = this.sentence.previous;
            this.exercise = prevSentence.exercise;
            this.sentence = prevSentence;
        }
        else if (event.key.match(/^.$/)) {
            this.input(event.key);
        }
        else {
            preventDefault = false;
        }
        if (preventDefault)
            event.preventDefault();
    }
    /**
     * Valide ou invalide la phrase ou le mot actuel,
     * ou démarre une nouvelle phrase.
     */
    continue() {
        console.info('continue');
        this.continueAvailable = false;
        if (this.letter.correct !== false) {
            const { exercise, sentence, word } = this;
            if (exercise.correct) {
                this.exercise = exercise.next;
            }
            else if (sentence.correct) {
                const nextSentence = sentence.next;
                this.exercise = nextSentence.exercise;
                this.sentence = nextSentence;
            }
            else if (word.correct) {
                this.word = word.next;
            }
            else {
                console.info('error ("continue" not available)');
                if (this.letter) {
                    this.emit('error');
                    this.letter.correct = false;
                    this.cancelAvailable = true;
                }
            }
        }
    }
    /**
     * Recommence le mot actuel si il est invalide
     */
    cancel() {
        this.cancelAvailable = false;
        const letter = this.letter;
        if (letter.neutral || !letter.correct) {
            this.word.neutral = true;
            this.letter = this.word.letters[0];
        }
    }
    /**
     * Nouveau caractère
     */
    input(character) {
        this.continueAvailable = false;
        if (this.letter.correct !== false) {
            // S'assurer d'avoir un seul caractère
            character = character[0];
            const { letter, word, sentence } = this;
            console.log(letter);
            if (letter.neutral && letter.character === character) {
                letter.correct = true;
                letter.firstTry = (letter.firstTry === null);
                this.emit('letter-correct', letter);
                if (word.neutral) {
                    this.letter = letter.next;
                }
                else if (word.correct) {
                    this.letter.focused = false;
                    this.continueAvailable = true;
                }
                console.info('correct');
            }
            else {
                console.info('error');
                this.emit('error');
                letter.correct = false;
                this.cancelAvailable = true;
            }
        }
    }
    get exercise() {
        return this.letter ? this.sentence.exercise : null;
    }
    set exercise(exercise) {
        this.sentence = exercise.sentences[0];
        this.advice = exercise.advice;
        this.$.querySelector('header .exercise-number').innerHTML = `${exercise.id + 1}`;
        this.$.querySelector('header .exercise-title').innerHTML = exercise.title;
        this.$.querySelector('header .sentence-count').innerHTML = `${exercise.sentences.length}`;
        this.cookies.exercise = exercise.index;
        this.emit('exercise-changed', exercise);
    }
    get sentence() {
        return this.letter ? this.word.sentence : null;
    }
    set sentence(sentence) {
        const previousSentence = this.sentence;
        if (previousSentence) {
            console.log('reset');
            // Reset
            previousSentence.words.forEach(word => {
                word.letters.forEach(letter => {
                    letter.firstTry = null;
                    letter.correct = null;
                });
            });
            this.$output.removeChild(previousSentence.$);
        }
        this.$output.appendChild(sentence.$);
        sentence.updateClassList();
        this.word = sentence.words[0];
        this.$.querySelector('header .sentence-number').innerHTML = `${sentence.id + 1}`;
        this.cookies.sentence = sentence.index;
        this.emit('sentence-changed');
    }
    get word() {
        return this.letter ? this.letter.word : null;
    }
    set word(word) {
        this.letter = word.letters[0];
    }
    get letter() {
        return this._letter;
    }
    set letter(letter) {
        const oldLetter = this._letter;
        this._letter = null;
        if (oldLetter)
            oldLetter.focused = false;
        this._letter = letter;
        letter.focused = true;
    }
    set continueAvailable(available) {
        const $info = this.$.querySelector('.press-space-info');
        if (available)
            $info.classList.add('visible');
        else
            $info.classList.remove('visible');
    }
    set cancelAvailable(available) {
        const $info = this.$.querySelector('.press-back-info');
        if (available)
            $info.classList.add('visible');
        else
            $info.classList.remove('visible');
    }
    set advice(advice) {
        this.$.querySelector('.advice').innerHTML = advice || '';
    }
}
exports.default = Session;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
const sentence_1 = __webpack_require__(5);
class Exercise {
    constructor(id, data, session) {
        this.sentences = [];
        this.id = id;
        this.session = session;
        this.title = data.title;
        this.letters = data.letters;
        this.advice = data.advice !== null ? this.session.data.advices[data.advice] : null;
        data.sentences.forEach((text, id) => this.sentences.push(new sentence_1.default(id, text, this)));
    }
    get correct() {
        const notCorrectSentence = this.sentences.find(sentence => !sentence.correct);
        return notCorrectSentence ? notCorrectSentence.correct : true;
    }
    get next() {
        return utils_1.getNext(this.session.exercises, this) || this.session.exercises[0];
    }
    get previous() {
        return utils_1.getPrevious(this.session.exercises, this) || this.session.exercises[this.session.exercises.length - 1];
    }
    get index() {
        return utils_1.getIndex(this.session.exercises, this);
    }
}
exports.default = Exercise;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Keyboard {
    constructor(session, variant = 'classic') {
        this.Keys = [
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
        ];
        this.keys = [];
        this.$ = document.querySelector('.keyboard');
        this.$inputs = {
            typematrix: this.$.querySelector('[name="keyboard"][value="typematrix"]'),
            classic: this.$.querySelector('[name="keyboard"][value="classic"]'),
            hidden: this.$.querySelector('[name="keyboard"][value="hidden"]')
        };
        this.session = session;
        this.variant = variant;
        this.hidden = this.session.cookies.keyboardHidden;
        this.$inputs.typematrix.addEventListener('change', event => {
            this.hidden = false;
            this.variant = 'typematrix';
        });
        this.$inputs.classic.addEventListener('change', event => {
            this.hidden = false;
            this.variant = 'classic';
        });
        this.$inputs.hidden.addEventListener('change', event => this.hidden = !this.hidden);
        this.Keys.forEach(line => {
            const $line = document.createElement('div');
            $line.className = 'line';
            this.$.appendChild($line);
            line.forEach(keyOrSpace => {
                if (keyOrSpace.width !== undefined) {
                    const space = keyOrSpace;
                    const $space = document.createElement('div');
                    $space.className = 'space';
                    if (space.variant)
                        $space.classList.add(space.variant);
                    $space.style.flexGrow = `${space.width}`;
                    $line.appendChild($space);
                }
                else if (keyOrSpace.plain !== undefined) {
                    const key = keyOrSpace;
                    key.$ = document.createElement('div');
                    key.$.className = 'key';
                    if (key.variant)
                        key.$.classList.add(key.variant);
                    key.ctrl = key.ctrl || '';
                    key.shift = key.shift || '';
                    key.ctrlshift = key.ctrlshift || '';
                    key.chars = key.plain + key.ctrl + key.shift + key.ctrlshift;
                    key.$.setAttribute('data-plain', key.plain);
                    key.$.setAttribute('data-ctrl', key.ctrl);
                    key.$.setAttribute('data-shift', key.shift);
                    key.$.setAttribute('data-ctrlshift', key.ctrlshift);
                    $line.appendChild(key.$);
                    this.keys.push(key);
                }
            });
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Control' || event.key === 'AltGr') {
                this.$.classList.add('ctrl');
            }
            if (event.key === 'Shift')
                this.$.classList.add('shift');
            this.keys.forEach(key => {
                if (key.chars.includes(event.key) && event.key !== ' ')
                    key.$.classList.add('down');
            });
        });
        document.addEventListener('keyup', event => {
            if (event.key === 'Control' || event.key === 'AltGr') {
                this.$.classList.remove('ctrl');
            }
            if (event.key === 'Shift')
                this.$.classList.remove('shift');
            this.keys.forEach(key => {
                if (key.chars.includes(event.key) && event.key !== ' ')
                    key.$.classList.remove('down');
            });
        });
        session.on('exercise-changed', exercise => {
            let availableCharacters = '';
            for (let i = 0; i < session.exercises.length; i++) {
                if (session.exercises[i] !== exercise) {
                    availableCharacters += session.exercises[i].letters;
                }
                else
                    break;
            }
            this.highlight(exercise.letters, availableCharacters);
        });
    }
    get hidden() {
        return this.$.classList.contains('hidden');
    }
    set hidden(hidden) {
        if (hidden)
            this.$.classList.add('hidden');
        else
            this.$.classList.remove('hidden');
        if (hidden) {
            this.$inputs.typematrix.checked = false;
            this.$inputs.classic.checked = false;
            this.$inputs.hidden.checked = true;
        }
        else {
            this.$inputs.hidden.checked = false;
        }
        this.session.cookies.keyboardHidden = hidden;
    }
    get variant() {
        return this.$inputs.typematrix.checked ? 'typematrix' : 'classic';
    }
    set variant(variant) {
        this.$inputs.typematrix.checked = false;
        this.$inputs.classic.checked = false;
        this.$inputs.hidden.checked = false;
        this.$inputs[variant].checked = true;
        this.$.classList.remove('typematrix', 'classic');
        this.$.classList.add(variant);
        this.session.cookies.keyboardVariant = variant;
    }
    highlight(characters, availableCharacters = '') {
        this.keys.forEach(key => {
            key.$.classList.remove('highlight', 'available');
            for (let i = 0; i < availableCharacters.length; i++) {
                if (key.chars.includes(availableCharacters[i])) {
                    key.$.classList.add('available');
                    break;
                }
            }
            for (let i = 0; i < characters.length; i++) {
                if (key.chars.includes(characters[i]) && characters[i] !== ' ') {
                    key.$.classList.add('highlight', 'available');
                }
            }
        });
    }
}
exports.default = Keyboard;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
class Letter {
    constructor(character, word) {
        this._correct = null;
        this.$ = document.createElement('span');
        this.firstTry = null;
        this.character = character;
        this.word = word;
        this.$.classList.add('letter', 'neutral');
        this.$.appendChild(document.createTextNode(character));
    }
    get correct() {
        return this._correct;
    }
    set correct(correct) {
        if (correct === true) {
            this.$.classList.remove('incorrect', 'neutral');
            this.$.classList.add('correct');
        }
        else if (correct === false) {
            this.$.classList.remove('correct', 'neutral');
            this.$.classList.add('incorrect');
        }
        else {
            this.$.classList.remove('correct', 'incorrect');
            this.$.classList.add('neutral');
        }
        this._correct = correct;
        this.word.updateClassList();
    }
    get neutral() {
        return this._correct === null;
    }
    set neutral(neutral) {
        if (!neutral)
            throw "The attribute 'neutral' cannot be set to false; use 'correct' instead.";
        this.correct = null;
    }
    get focused() {
        return this.$.classList.contains('focused');
    }
    set focused(focused) {
        if (focused)
            this.$.classList.add('focused');
        else
            this.$.classList.remove('focused');
        this.word.updateClassList();
    }
    get next() {
        return utils_1.getNext(this.word.letters, this) || this.word.next.letters[0];
    }
    get previous() {
        const previous = utils_1.getPrevious(this.word.letters, this);
        if (previous) {
            return previous;
        }
        else {
            const letters = this.word.previous.letters;
            return letters[letters.length - 1];
        }
    }
}
exports.default = Letter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
const word_1 = __webpack_require__(6);
class Sentence {
    constructor(id, text, exercise) {
        this.words = [];
        this.$ = document.createElement('p');
        this.id = id;
        this.exercise = exercise;
        this.$.classList.add('sentence');
        const wordStrings = text.split(' ');
        wordStrings.forEach((wordString, i) => {
            const word = new word_1.default(wordString, this);
            this.words.push(word);
            this.$.appendChild(word.$);
            if (i < wordStrings.length - 1) {
                const $space = document.createElement('span');
                $space.appendChild(document.createTextNode(' '));
                $space.classList.add('space');
                this.$.appendChild($space);
            }
        });
    }
    get correct() {
        const notCorrectWord = this.words.find(word => !word.correct);
        return notCorrectWord ? notCorrectWord.correct : true;
    }
    updateClassList() {
        const correct = this.correct;
        if (this.$.parentElement) {
            if (correct === true) {
                this.$.parentElement.classList.add('correct');
            }
            else {
                this.$.parentElement.classList.remove('correct');
            }
        }
    }
    get next() {
        return utils_1.getNext(this.exercise.sentences, this) || this.exercise.next.sentences[0];
    }
    get previous() {
        const previous = utils_1.getPrevious(this.exercise.sentences, this);
        if (previous) {
            return previous;
        }
        else {
            const sentences = this.exercise.previous.sentences;
            return sentences[sentences.length - 1];
        }
    }
    get index() {
        return utils_1.getIndex(this.exercise.sentences, this);
    }
}
exports.default = Sentence;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
const letter_1 = __webpack_require__(4);
class Word {
    constructor(text, sentence) {
        this.$ = document.createElement('span');
        this.letters = [];
        this.sentence = sentence;
        this.text = text;
        this.$.classList.add('word', 'neutral');
        for (let i = 0; i < text.length; i++) {
            const letter = new letter_1.default(text[i], this);
            this.letters.push(letter);
            this.$.appendChild(letter.$);
        }
    }
    get correct() {
        const notCorrectLetter = this.letters.find(letter => !letter.correct);
        return notCorrectLetter ? notCorrectLetter.correct : true;
    }
    get focused() {
        return this.sentence.exercise.session.word === this;
    }
    updateClassList() {
        const correct = this.correct;
        if (correct === true) {
            this.$.classList.remove('incorrect', 'neutral');
            this.$.classList.add('correct');
            this.sentence.updateClassList();
        }
        else if (correct === false) {
            this.$.classList.remove('correct', 'neutral');
            this.$.classList.add('incorrect');
            this.sentence.updateClassList();
        }
        else {
            this.$.classList.remove('correct', 'incorrect');
            this.$.classList.add('neutral');
        }
        if (this.focused)
            this.$.classList.add('focused');
        else
            this.$.classList.remove('focused');
    }
    get neutral() {
        return this.correct === null;
    }
    set neutral(neutral) {
        if (!neutral)
            throw "The attribute 'neutral' cannot be set to false; use 'correct' instead.";
        this.letters.forEach(letter => letter.neutral = true);
    }
    get next() {
        return utils_1.getNext(this.sentence.words, this) || this.sentence.next.words[0];
    }
    get previous() {
        const previous = utils_1.getPrevious(this.sentence.words, this);
        if (previous) {
            return previous;
        }
        else {
            const words = this.sentence.previous.words;
            return words[words.length - 1];
        }
    }
}
exports.default = Word;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__data__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__session__);



const session = new __WEBPACK_IMPORTED_MODULE_1__session___default.a

// Ajout des écouteurs


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getPrevious(collection, item) {
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
exports.getPrevious = getPrevious;
function getNext(collection, item) {
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
exports.getNext = getNext;
function getIndex(collection, item) {
    for (let i = 0; i < collection.length; i++) {
        if (item === collection[i])
            return i;
    }
    return null;
}
exports.getIndex = getIndex;
class CookiesHandler {
    constructor() {
        this.load();
        window.addEventListener('unload', event => {
            this.save();
        });
    }
    load() {
        let data;
        try {
            data = JSON.parse(document.cookie);
            if (typeof data !== 'object')
                throw new Error;
        }
        catch (e) {
            data = {};
        }
        this.cookies = data;
    }
    save() {
        document.cookie = JSON.stringify(this.cookies);
    }
    reset() {
        this.cookies = {};
        this.save();
    }
    static get instance() {
        if (!CookiesHandler._instance)
            CookiesHandler._instance = new CookiesHandler;
        return CookiesHandler._instance;
    }
}
exports.CookiesHandler = CookiesHandler;
console.log(CookiesHandler.instance);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = __webpack_require__(10);
class Logger extends EventEmitter {
    constructor() {
        super();
        this.lastKeyLogTime = 0;
        this.correctLetters = 0;
        this.errors = 0;
        this.count = 0;
        this.average = null;
    }
    logCorrectInput(letter) {
        console.log(letter);
        if (letter.firstTry)
            this.correctLetters++;
        let count = this.count;
        let average = this.average;
        const now = +new Date;
        const interval = now - this.lastKeyLogTime;
        if (interval < Logger.MaxInterval) {
            count++;
            if (count > 1) {
                average = average / count * (count - 1) + interval / count;
            }
            else {
                average = interval;
            }
            this.average = average;
            this.count = count;
        }
        if (this.stopFunction !== null)
            clearTimeout(this.stopFunction);
        this.emit('running');
        this.stopFunction = setTimeout(e => this.emit('paused'), Logger.MaxInterval);
        this.lastKeyLogTime = now;
    }
    logError() {
        this.errors++;
        this.pause();
    }
    /**
     * La vitesse moyenne en lettres/secondes d'aujourd'hui.
     */
    get charactersPerSecond() {
        return this.count ? 1000 / this.average : 0;
    }
    /**
     * Forcer la pause
     */
    pause() {
        this.lastKeyLogTime = 0;
        this.emit('paused');
    }
}
Logger.MaxInterval = 5000;
class StatsHandler {
    constructor(session) {
        this.maxCharacterInterval = 5;
        this.$ = document.querySelector('.stats');
        this.$success = this.$.querySelector('.success output');
        this.$errors = this.$.querySelector('.errors output');
        this.$speed = this.$.querySelector('.speed output');
        this.characterCount = 0;
        this.logger = new Logger;
        this.session = session;
        this.updateUI();
        this.createListeners();
    }
    createListeners() {
        this.logger.on('running', e => this.$speed.classList.remove('paused'));
        this.logger.on('paused', e => this.$speed.classList.add('paused'));
        this.session.on('sentence-done', e => this.logger.pause());
        this.session.on('letter-correct', letter => {
            this.logger.logCorrectInput(letter);
            this.updateUI();
        });
        this.session.on('error', e => {
            this.logger.logError();
            this.updateUI();
        });
    }
    updateUI() {
        this.$success.innerHTML = `${this.logger.correctLetters}`;
        this.$errors.innerHTML = `${this.logger.errors}`;
        this.$speed.innerHTML = this.logger.charactersPerSecond.toFixed(2);
    }
}
exports.default = StatsHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map