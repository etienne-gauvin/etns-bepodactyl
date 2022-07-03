/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./src/scripts/data.ts":
/*!*****************************!*\
  !*** ./src/scripts/data.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => (/* binding */ data)
/* harmony export */ });
const data = {
    "advices": [
        "Pour frapper les majuscules, utiliser l'auriculaire de la main opposée à celle qui tape la lettre. Ainsi, on doit utiliser l'auriculaire droit pour les majuscules AUIE et l'auriculaire gauche pour NRST.",
        "Pour le M et le Z, l'auriculaire droit doit s'étendre hors de sa colonne. La virgule et le È doivent être faits avec l’index gauche.",
        "Le K et le point se font avec la main gauche. L'apostrophe et le Q se font avec la main droite. L'apostrophe nécessite d'étirer un peu plus l'index. Attention à ne pas confondre les deux ! Le principe est toujours le même :  la précision est bien plus importante que la rapidité.",
        "Attention, c’est bien l’annulaire gauche qui doit être utilisé pour faire le « Y » !",
        "L'accent circonflexe (en dessous du point d'exclamation) et le tréma (en AltGr+I) doivent être tapés seuls. Vous ne verrez rien, mais l'accent apparaîtra sur la voyelle tapée ensuite. Un subtilité pour Ê, qui peut être obtenu de deux façons :  par la 105ème touche du clavier Ê, ou avec l'accent circonflexe, puis le E.",
        "Une petite difficulté supplémentaire pour les deux points, le point-virgule, le point d'exclamation et le point d'interrogation qui doivent tous être précédés d'une espace insécable (représentée ici par « ␣ »), obtenue en maintenant la touche majuscule durant la frappe de l'espace. Conserver ensuite la touche majuscule appuyée pour la frappe du signe de ponctuation, qui est justement en majuscule lui-aussi. Ne pas oublier de relâcher avant la frappe de l'espace suivante.",
        "Une petite difficulté supplémentaire pour les guillemets ouverts qui doivent être suivis d'une espace insécable, ainsi que pour les guillemets fermés qui doivent être précédés d'une espace insécable, obtenue en maintenant la touche majuscule durant la frappe de l'espace.",
        "En guise de conclusion, voici des exercices où, à chaque ligne, on trouve toutes les lettres de l’alphabet :  des pangrammes.",
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
                "annette et tata tentent attentat en tente",
            ],
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
                "anastasie tissait sa taie en satin et anne assistait assise en se taisant",
            ],
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
                "un raisin rassis sustenterait un sarrasin sinistre et une tunisienne nantie en nuisette",
            ],
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
                "On va vers une aventure vaseuse si on avoue avoir vu son invention",
            ],
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
                "Nous avons pour ainsi dire perdu notre inspiration et repoussons notre dispensaire",
            ],
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
                "Une révolutionnaire esseulée est délaissée par les prisonniers dépassés par les événements",
            ],
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
                "Jules abjura les jeunes et éblouit ses subordonnés débordants de jalousie",
            ],
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
                "Les trapézistes volent, une dizaine de zèbres parcourent la piste, et douze lézards ramassent les restes",
            ],
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
                "Dans ce western, les cavaliers sont souvent désarçonnés",
            ],
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
                "Je m'inquiète de ce qu'impliquent ces quatorze quatrains.",
            ],
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
                "Avec mes index et mes majeurs, j'indexe des données qui avaient été annexées.",
            ],
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
                "Le chiche, son chicha et son chien sont souvent chez Sanson ou chez Charles sans se soucier de sa sécheuse sèche.",
            ],
        },
        {
            "title": "À et F (auriculaires)",
            "letters": "àfÀF",
            "sentences": [
                "Riri, Fifi et Loulou.",
                "Pif, paf, pouf.",
                "Et voilà, on a fait le tour de toutes les touches.",
                "Le bépo, c'est facile, finalement.",
                "À partir de maintenant, il suffira de faire quelques derniers petits efforts.",
            ],
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
                "Les paranoïaques poussent des cris suraigüs.",
            ],
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
                "Je ne sais où ni quand.",
            ],
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
                "Peut-être est-il trop tard.",
            ],
        },
        {
            "title": "Ponctuation double ( :  !) et espace insécable",
            "letters": ": !",
            "advice": 5,
            "sentences": [
                "Et revoilà la sous-préfète !",
                "La voilà  elle arrive !",
            ],
        },
        {
            "title": "Parenthèses",
            "letters": "()",
            "sentences": [
                "World Wide Web (www)",
            ],
        },
        {
            "title": "Guillemets",
            "letters": "«»",
            "advice": 6,
            "sentences": [
                "la Haute Autorité pour la Diffusion des Œuvres et la Protection des Droits sur Internet ou « HADOPI »",
            ],
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
                "Voyez ce jeu exquis wallon, de graphie en kit mais bref.",
            ],
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
                "Voix ambiguë d'un cœur qui, au zéphyr, préfère les jattes de kiwis.",
            ],
        },
    ],
};



/***/ }),

/***/ "./src/scripts/event-emitter.ts":
/*!**************************************!*\
  !*** ./src/scripts/event-emitter.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }
    removeListener(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener.apply(this, args);
            }
        }
    }
    once(event, listener) {
        this.on(event, function fn(...args) {
            this.removeListener(event, fn);
            listener.apply(this, args);
        });
    }
}


/***/ }),

/***/ "./src/scripts/exercise.ts":
/*!*********************************!*\
  !*** ./src/scripts/exercise.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Exercise)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.ts");
/* harmony import */ var _sentence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sentence */ "./src/scripts/sentence.ts");


class Exercise {
    constructor(id, data, session) {
        this.sentences = [];
        this.id = id;
        this.session = session;
        this.title = data.title;
        this.letters = data.letters;
        this.advice = data.advice !== null
            ? this.session.data.advices[data.advice]
            : null;
        data.sentences.forEach((text, id) => this.sentences.push(new _sentence__WEBPACK_IMPORTED_MODULE_1__["default"](id, text, this)));
    }
    get correct() {
        const notCorrectSentence = this.sentences.find((sentence) => !sentence.correct);
        return notCorrectSentence ? notCorrectSentence.correct : true;
    }
    get next() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getNext)(this.session.exercises, this) || this.session.exercises[0];
    }
    get previous() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPrevious)(this.session.exercises, this) ||
            this.session.exercises[this.session.exercises.length - 1];
    }
    get index() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getIndex)(this.session.exercises, this);
    }
}


/***/ }),

/***/ "./src/scripts/keyboard-config.ts":
/*!****************************************!*\
  !*** ./src/scripts/keyboard-config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KEYS": () => (/* binding */ KEYS)
/* harmony export */ });
const isKey = true;
const isSpace = true;
const KEYS = [
    [
        { isKey, default: "$", shift: "#", ctrl: "–", ctrlshift: " " },
        { isKey, default: '"', shift: "1", ctrl: "—", ctrlshift: "„" },
        { isKey, default: "«", shift: "2", ctrl: "<", ctrlshift: "“" },
        { isKey, default: "»", shift: "3", ctrl: ">", ctrlshift: "”" },
        { isKey, default: "(", shift: "4", ctrl: "[", ctrlshift: "≤" },
        { isKey, default: ")", shift: "5", ctrl: "]", ctrlshift: "≥" },
        { isSpace, width: 1, variant: "typematrix" },
        { isKey, default: "@", shift: "6", ctrl: " ", ctrlshift: " " },
        { isKey, default: "+", shift: "7", ctrl: " ", ctrlshift: " " },
        { isKey, default: "-", shift: "8", ctrl: " ", ctrlshift: " " },
        { isKey, default: "/", shift: "9", ctrl: " ", ctrlshift: " " },
        { isKey, default: "*", shift: "0", ctrl: " ", ctrlshift: " " },
        { isKey, default: "=", shift: "°", ctrl: " ", ctrlshift: " " },
        { isKey, default: "%", shift: "`", ctrl: " ", ctrlshift: " " },
        { isSpace, width: 0.67, variant: "classic" },
    ],
    [
        { isSpace, width: 1, variant: "typematrix" },
        { isSpace, width: 1.33, variant: "classic" },
        { isKey, default: "b", shift: "B", ctrl: "|", ctrlshift: " " },
        { isKey, default: "é", shift: "É", ctrl: " ", ctrlshift: "˝" },
        { isKey, default: "p", shift: "P", ctrl: "&", ctrlshift: " " },
        { isKey, default: "o", shift: "O", ctrl: "œ", ctrlshift: "Œ" },
        { isKey, default: "è", shift: "È", ctrl: " ", ctrlshift: " " },
        { isSpace, width: 1, variant: "typematrix" },
        { isKey, default: "^", shift: "!", ctrl: "¡", ctrlshift: " " },
        { isKey, default: "v", shift: "V", ctrl: " ", ctrlshift: " " },
        { isKey, default: "d", shift: "D", ctrl: " ", ctrlshift: " " },
        { isKey, default: "l", shift: "L", ctrl: " ", ctrlshift: " " },
        { isKey, default: "j", shift: "J", ctrl: " ", ctrlshift: " " },
        { isKey, default: "z", shift: "Z", ctrl: " ", ctrlshift: " " },
        { isKey, default: "w", shift: "W", ctrl: " ", ctrlshift: " " },
        { isSpace, width: 0.34, variant: "classic" },
    ],
    [
        { isSpace, width: 1, variant: "typematrix" },
        { isSpace, width: 1.66, variant: "classic" },
        { isKey, default: "a", shift: "A", ctrl: "æ", ctrlshift: "Æ" },
        { isKey, default: "u", shift: "U", ctrl: "ù", ctrlshift: "Ù" },
        { isKey, default: "i", shift: "I", ctrl: "¨", ctrlshift: " " },
        { isKey, default: "e", shift: "E", ctrl: "€", ctrlshift: " " },
        { isKey, default: ",", shift: ";", ctrl: "’", ctrlshift: " " },
        { isSpace, width: 1, variant: "typematrix" },
        { isKey, default: "c", shift: "C", ctrl: " ", ctrlshift: " " },
        { isKey, default: "t", shift: "T", ctrl: " ", ctrlshift: " " },
        { isKey, default: "s", shift: "S", ctrl: " ", ctrlshift: " " },
        { isKey, default: "r", shift: "R", ctrl: " ", ctrlshift: " " },
        { isKey, default: "n", shift: "N", ctrl: " ", ctrlshift: " " },
        { isKey, default: "m", shift: "M", ctrl: " ", ctrlshift: " " },
        {
            isKey,
            default: "ç",
            shift: "Ç",
            ctrl: " ",
            ctrlshift: " ",
            variant: "classic",
        },
        { isSpace, width: 1, variant: "typematrix" },
    ],
    [
        { isSpace, width: 1 },
        {
            isKey,
            default: "ê",
            shift: "Ê",
            ctrl: " ",
            ctrlshift: " ",
            variant: "classic",
            dotted: true,
        },
        { isKey, default: "à", shift: "À", ctrl: "\\", ctrlshift: " " },
        { isKey, default: "y", shift: "Y", ctrl: "{", ctrlshift: "‘" },
        { isKey, default: "x", shift: "X", ctrl: "}", ctrlshift: "’" },
        { isKey, default: ".", shift: ":", ctrl: "…", ctrlshift: "·" },
        { isKey, default: "k", shift: "K", ctrl: " ", ctrlshift: " " },
        { isSpace, width: 1, variant: "typematrix" },
        { isKey, default: "'", shift: "?", ctrl: "¿", ctrlshift: " " },
        { isKey, default: "q", shift: "Q", ctrl: " ", ctrlshift: " " },
        { isKey, default: "g", shift: "G", ctrl: " ", ctrlshift: " " },
        { isKey, default: "h", shift: "H", ctrl: " ", ctrlshift: " " },
        { isKey, default: "f", shift: "F", ctrl: " ", ctrlshift: " " },
        {
            isKey,
            default: "ç",
            shift: "Ç",
            ctrl: " ",
            ctrlshift: " ",
            variant: "typematrix",
        },
        { isSpace, width: 1.67, variant: "classic" },
        { isSpace, width: 1, variant: "typematrix" },
    ],
];


/***/ }),

/***/ "./src/scripts/keyboard.ts":
/*!*********************************!*\
  !*** ./src/scripts/keyboard.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyboardDisplay": () => (/* binding */ KeyboardDisplay),
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _keyboard_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboard-config */ "./src/scripts/keyboard-config.ts");

var KeyboardDisplay;
(function (KeyboardDisplay) {
    KeyboardDisplay["TypeMatrix"] = "typematrix";
    KeyboardDisplay["Classic"] = "classic";
    KeyboardDisplay["Hidden"] = "hidden";
})(KeyboardDisplay || (KeyboardDisplay = {}));
class Keyboard {
    constructor($, session, variant) {
        this.$ = $;
        this.session = session;
        this.keys = [];
        this.$inputs = {
            typematrix: this.$.querySelector('[name="keyboard"][value="typematrix"]'),
            classic: this.$.querySelector('[name="keyboard"][value="classic"]'),
            hidden: this.$.querySelector('[name="keyboard"][value="hidden"]'),
        };
        this.session = session;
        this.variant = variant;
        this.hidden = !!this.session.cookies.keyboardHidden;
        this.$inputs.typematrix.addEventListener("change", () => {
            this.hidden = false;
            this.variant = KeyboardDisplay.TypeMatrix;
        });
        this.$inputs.classic.addEventListener("change", () => {
            this.hidden = false;
            this.variant = KeyboardDisplay.Classic;
        });
        this.$inputs.hidden.addEventListener("change", () => this.hidden = !this.hidden);
        _keyboard_config__WEBPACK_IMPORTED_MODULE_0__.KEYS.forEach((line) => {
            const $line = document.createElement("div");
            $line.className = "line";
            this.$.appendChild($line);
            line.forEach((keyOrSpace) => {
                var _a, _b, _c, _d, _e;
                if ("isSpace" in keyOrSpace) {
                    const space = keyOrSpace;
                    const $space = document.createElement("div");
                    $space.className = "space";
                    if (space.variant)
                        $space.classList.add(space.variant);
                    $space.style.flexGrow = `${space.width}`;
                    $line.appendChild($space);
                }
                else if ("isKey" in keyOrSpace) {
                    const key = {
                        default: (_a = keyOrSpace.default) !== null && _a !== void 0 ? _a : "",
                        ctrl: (_b = keyOrSpace.ctrl) !== null && _b !== void 0 ? _b : "",
                        shift: (_c = keyOrSpace.shift) !== null && _c !== void 0 ? _c : "",
                        ctrlshift: (_d = keyOrSpace.ctrlshift) !== null && _d !== void 0 ? _d : "",
                        dotted: (_e = keyOrSpace.dotted) !== null && _e !== void 0 ? _e : false,
                        variant: keyOrSpace.variant,
                        $: document.createElement("div"),
                        chars: "",
                    };
                    key.$.className = "key";
                    if (key.variant)
                        key.$.classList.add(key.variant);
                    key.chars = [key.default, key.ctrl, key.shift, key.ctrlshift].filter((c) => c).join('');
                    key.$.setAttribute("data-plain", key.default);
                    key.$.setAttribute("data-ctrl", key.ctrl);
                    key.$.setAttribute("data-shift", key.shift);
                    key.$.setAttribute("data-ctrlshift", key.ctrlshift);
                    $line.appendChild(key.$);
                    this.keys.push(key);
                }
            });
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Control" || event.key === "AltGr") {
                this.$.classList.add("ctrl");
            }
            if (event.key === "Shift")
                this.$.classList.add("shift");
            this.keys.forEach((key) => {
                if (key.chars.includes(event.key) && event.key !== " ") {
                    key.$.classList.add("down");
                }
            });
        });
        document.addEventListener("keyup", (event) => {
            if (event.key === "Control" || event.key === "AltGr") {
                this.$.classList.remove("ctrl");
            }
            if (event.key === "Shift")
                this.$.classList.remove("shift");
            for (const key of this.keys) {
                if (key.chars.includes(event.key) && event.key !== " ") {
                    key.$.classList.remove("down");
                }
            }
        });
        session.on("exercise-changed", (currentExercise) => {
            const lettersOfPreviousExercises = session.exercises
                .slice(0, session.exercises.indexOf(currentExercise))
                .map((exercise) => exercise.letters)
                .join('');
            this.highlight(currentExercise.letters, lettersOfPreviousExercises);
        });
    }
    get hidden() {
        return this.$.classList.contains("hidden");
    }
    set hidden(hidden) {
        if (hidden)
            this.$.classList.add("hidden");
        else
            this.$.classList.remove("hidden");
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
        if (this.$inputs.typematrix.checked) {
            return KeyboardDisplay.TypeMatrix;
        }
        else if (this.$inputs.classic.checked) {
            return KeyboardDisplay.Classic;
        }
        else {
            return KeyboardDisplay.Hidden;
        }
    }
    set variant(variant) {
        this.$inputs.typematrix.checked = false;
        this.$inputs.classic.checked = false;
        this.$inputs.hidden.checked = false;
        this.$inputs[variant].checked = true;
        this.$.classList.remove("typematrix", "classic");
        this.$.classList.add(variant);
        this.session.cookies.keyboardVariant = variant;
    }
    highlight(characters, availableCharacters = "") {
        console.log('highlight', { characters, availableCharacters });
        for (const key of this.keys) {
            key.$.classList.remove("highlight", "available");
            for (const char of availableCharacters) {
                if (key.chars.includes(char)) {
                    key.$.classList.add("available");
                    break;
                }
            }
            for (const char of characters) {
                if (key.chars.includes(char) && char !== " ") {
                    key.$.classList.add("highlight", "available");
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/scripts/letter.ts":
/*!*******************************!*\
  !*** ./src/scripts/letter.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Letter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.ts");

class Letter {
    constructor(character, word) {
        this._correct = null;
        this.$ = document.createElement("span");
        this.firstTry = null;
        this.character = character;
        this.word = word;
        this.$.classList.add("letter", "neutral");
        this.$.appendChild(document.createTextNode(character));
    }
    get correct() {
        return this._correct;
    }
    set correct(correct) {
        if (correct === true) {
            this.$.classList.remove("incorrect", "neutral");
            this.$.classList.add("correct");
        }
        else if (correct === false) {
            this.$.classList.remove("correct", "neutral");
            this.$.classList.add("incorrect");
        }
        else {
            this.$.classList.remove("correct", "incorrect");
            this.$.classList.add("neutral");
        }
        this._correct = correct;
        this.word.updateClassList();
    }
    get neutral() {
        return this._correct === null;
    }
    set neutral(neutral) {
        if (!neutral) {
            throw "The attribute 'neutral' cannot be set to false; use 'correct' instead.";
        }
        this.correct = null;
    }
    get focused() {
        return this.$.classList.contains("focused");
    }
    set focused(focused) {
        if (focused)
            this.$.classList.add("focused");
        else
            this.$.classList.remove("focused");
        this.word.updateClassList();
    }
    get next() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getNext)(this.word.letters, this) || this.word.next.letters[0];
    }
    get previous() {
        const previous = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPrevious)(this.word.letters, this);
        if (previous) {
            return previous;
        }
        else {
            const letters = this.word.previous.letters;
            return letters[letters.length - 1];
        }
    }
}


/***/ }),

/***/ "./src/scripts/sentence.ts":
/*!*********************************!*\
  !*** ./src/scripts/sentence.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sentence)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.ts");
/* harmony import */ var _word__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./word */ "./src/scripts/word.ts");


class Sentence {
    constructor(id, text, exercise) {
        this.words = [];
        this.$ = document.createElement("p");
        this.id = id;
        this.exercise = exercise;
        this.$.classList.add("sentence");
        const wordStrings = text.split(" ");
        wordStrings.forEach((wordString, i) => {
            const word = new _word__WEBPACK_IMPORTED_MODULE_1__["default"](wordString, this);
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
    get correct() {
        const notCorrectWord = this.words.find((word) => !word.correct);
        return notCorrectWord ? notCorrectWord.correct : true;
    }
    updateClassList() {
        const correct = this.correct;
        if (this.$.parentElement) {
            if (correct === true) {
                this.$.parentElement.classList.add("correct");
            }
            else {
                this.$.parentElement.classList.remove("correct");
            }
        }
    }
    get next() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getNext)(this.exercise.sentences, this) ||
            this.exercise.next.sentences[0];
    }
    get previous() {
        const previous = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPrevious)(this.exercise.sentences, this);
        if (previous) {
            return previous;
        }
        else {
            const sentences = this.exercise.previous.sentences;
            return sentences[sentences.length - 1];
        }
    }
    get index() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getIndex)(this.exercise.sentences, this);
    }
}


/***/ }),

/***/ "./src/scripts/session.ts":
/*!********************************!*\
  !*** ./src/scripts/session.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Session)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stats_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stats-handler */ "./src/scripts/stats-handler.ts");
/* harmony import */ var _exercise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exercise */ "./src/scripts/exercise.ts");
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyboard */ "./src/scripts/keyboard.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data */ "./src/scripts/data.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.ts");






class Session extends events__WEBPACK_IMPORTED_MODULE_0__ {
    constructor() {
        super();
        this.exercises = [];
        this.$ = document.querySelector("main");
        this.$output = this.$.querySelector(".sentence-container");
        this.data = _data__WEBPACK_IMPORTED_MODULE_4__.data;
        this.cookies = _utils__WEBPACK_IMPORTED_MODULE_5__.CookiesHandler.instance.cookies;
        this.stats = new _stats_handler__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        const variant = Object.values(_keyboard__WEBPACK_IMPORTED_MODULE_3__.KeyboardDisplay).includes(this.cookies.keyboardVariant) ? this.cookies.keyboardVariant : _keyboard__WEBPACK_IMPORTED_MODULE_3__.KeyboardDisplay.Classic;
        this.keyboard = new _keyboard__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector(".keyboard"), this, variant);
        this.data.exercises.forEach((exerciseData, id) => {
            this.exercises.push(new _exercise__WEBPACK_IMPORTED_MODULE_2__["default"](id, exerciseData, this));
        });
        this.$.querySelector("header .exercise-count").innerHTML =
            `${this.exercises.length}`;
        this.onKeyDown = this.onKeyDown.bind(this);
        addEventListener("keydown", this.onKeyDown);
        const exerciseIndex = +this.cookies.exercise || 0;
        this.exercise = this.exercises[exerciseIndex];
        const sentenceIndex = +this.cookies.sentence || 0;
        this.sentence = this.exercise.sentences[sentenceIndex];
    }
    onKeyDown(event) {
        let preventDefault = true;
        if (event.key === "Enter" || event.key === " ") {
            this.continue();
        }
        else if (event.key === "Backspace") {
            this.cancel();
        }
        else if (event.key === "PageDown") {
            this.exercise = this.exercise.next;
        }
        else if (event.key === "PageUp") {
            this.exercise = this.exercise.previous;
        }
        else if (event.key === "ArrowDown") {
            const nextSentence = this.sentence.next;
            this.exercise = nextSentence.exercise;
            this.sentence = nextSentence;
        }
        else if (event.key === "ArrowUp") {
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
                    this.emit("error");
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
            const { letter, word } = this;
            if (letter.neutral && letter.character === character) {
                letter.correct = true;
                letter.firstTry = letter.firstTry === null;
                this.emit("letter-correct", letter);
                if (word.neutral) {
                    this.letter = letter.next;
                }
                else if (word.correct) {
                    this.letter.focused = false;
                    this.continueAvailable = true;
                }
            }
            else {
                this.emit("error");
                letter.correct = false;
                this.cancelAvailable = true;
            }
        }
    }
    get exercise() {
        return this.letter ? this.sentence.exercise : null;
    }
    set exercise(exercise) {
        if (exercise !== this.exercise) {
            this.sentence = exercise.sentences[0];
            this.advice = exercise.advice;
            this.$.querySelector("header .exercise-number").innerHTML = `${exercise.id + 1}`;
            this.$.querySelector("header .exercise-title").innerHTML = exercise.title;
            this.$.querySelector("header .sentence-count").innerHTML =
                `${exercise.sentences.length}`;
            this.cookies.exercise = exercise.index;
            this.emit("exercise-changed", exercise);
        }
    }
    get sentence() {
        return this.letter ? this.word.sentence : null;
    }
    set sentence(sentence) {
        console.info("set sentence to ", sentence.words.map(w => w.letters.map(l => l.character).join('')).join(' '));
        const previousSentence = this.sentence;
        if (previousSentence) {
            previousSentence.words.forEach((word) => {
                word.letters.forEach((letter) => {
                    letter.firstTry = null;
                    letter.correct = null;
                });
            });
            this.$output.removeChild(previousSentence.$);
        }
        this.$output.appendChild(sentence.$);
        sentence.updateClassList();
        this.word = sentence.words[0];
        this.$.querySelector("header .sentence-number").innerHTML = `${sentence.id + 1}`;
        this.cookies.sentence = sentence.index;
        this.emit("sentence-changed");
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
        const $info = this.$.querySelector(".press-space-info");
        if (available)
            $info.classList.add("visible");
        else
            $info.classList.remove("visible");
    }
    set cancelAvailable(available) {
        const $info = this.$.querySelector(".press-back-info");
        if (available)
            $info.classList.add("visible");
        else
            $info.classList.remove("visible");
    }
    set advice(advice) {
        this.$.querySelector(".advice").innerHTML = advice || "";
    }
}


/***/ }),

/***/ "./src/scripts/stats-handler.ts":
/*!**************************************!*\
  !*** ./src/scripts/stats-handler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StatsHandler)
/* harmony export */ });
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-emitter */ "./src/scripts/event-emitter.ts");

class Logger extends _event_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this.lastKeyLogTime = 0;
        this.correctLetters = 0;
        this.errors = 0;
        this.count = 0;
    }
    logCorrectInput(letter) {
        console.log(letter);
        if (letter.firstTry)
            this.correctLetters++;
        let count = this.count;
        let average = this.average;
        const now = +new Date();
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
            window.clearTimeout(this.stopFunction);
        this.emit("running");
        this.stopFunction = window.setTimeout(() => this.emit("paused"), Logger.MaxInterval);
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
        this.emit("paused");
    }
}
Logger.MaxInterval = 5000;
class StatsHandler {
    constructor(session) {
        this.maxCharacterInterval = 5;
        this.$ = document.querySelector(".stats");
        this.$success = this.$.querySelector(".success output");
        this.$errors = this.$.querySelector(".errors output");
        this.$speed = this.$.querySelector(".speed output");
        this.logger = new Logger();
        this.session = session;
        this.updateUI();
        this.createListeners();
    }
    createListeners() {
        this.logger.on("running", () => this.$speed.classList.remove("paused"));
        this.logger.on("paused", () => this.$speed.classList.add("paused"));
        this.session.on("sentence-done", () => this.logger.pause());
        this.session.on("letter-correct", (letter) => {
            this.logger.logCorrectInput(letter);
            this.updateUI();
        });
        this.session.on("error", () => {
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


/***/ }),

/***/ "./src/scripts/utils.ts":
/*!******************************!*\
  !*** ./src/scripts/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CookiesHandler": () => (/* binding */ CookiesHandler),
/* harmony export */   "getIndex": () => (/* binding */ getIndex),
/* harmony export */   "getNext": () => (/* binding */ getNext),
/* harmony export */   "getPrevious": () => (/* binding */ getPrevious)
/* harmony export */ });
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
function getIndex(collection, item) {
    for (let i = 0; i < collection.length; i++) {
        if (item === collection[i])
            return i;
    }
    return null;
}
class CookiesHandler {
    constructor() {
        this.load();
        window.addEventListener("unload", () => {
            this.save();
        });
    }
    load() {
        let data;
        try {
            data = JSON.parse(document.cookie);
            if (typeof data !== "object")
                throw new Error();
        }
        catch (_e) {
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
        if (!CookiesHandler._instance) {
            CookiesHandler._instance = new CookiesHandler();
        }
        return CookiesHandler._instance;
    }
}
console.log(CookiesHandler.instance);


/***/ }),

/***/ "./src/scripts/word.ts":
/*!*****************************!*\
  !*** ./src/scripts/word.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Word)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.ts");
/* harmony import */ var _letter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./letter */ "./src/scripts/letter.ts");


class Word {
    constructor(text, sentence) {
        this.$ = document.createElement("span");
        this.letters = [];
        this.sentence = sentence;
        this.text = text;
        this.$.classList.add("word", "neutral");
        for (let i = 0; i < text.length; i++) {
            const letter = new _letter__WEBPACK_IMPORTED_MODULE_1__["default"](text[i], this);
            this.letters.push(letter);
            this.$.appendChild(letter.$);
        }
    }
    get correct() {
        const notCorrectLetter = this.letters.find((letter) => !letter.correct);
        return notCorrectLetter ? notCorrectLetter.correct : true;
    }
    get focused() {
        return this.sentence.exercise.session.word === this;
    }
    updateClassList() {
        const correct = this.correct;
        if (correct === true) {
            this.$.classList.remove("incorrect", "neutral");
            this.$.classList.add("correct");
            this.sentence.updateClassList();
        }
        else if (correct === false) {
            this.$.classList.remove("correct", "neutral");
            this.$.classList.add("incorrect");
            this.sentence.updateClassList();
        }
        else {
            this.$.classList.remove("correct", "incorrect");
            this.$.classList.add("neutral");
        }
        if (this.focused)
            this.$.classList.add("focused");
        else
            this.$.classList.remove("focused");
    }
    get neutral() {
        return this.correct === null;
    }
    set neutral(neutral) {
        if (!neutral) {
            throw "The attribute 'neutral' cannot be set to false; use 'correct' instead.";
        }
        this.letters.forEach((letter) => letter.neutral = true);
    }
    get next() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getNext)(this.sentence.words, this) || this.sentence.next.words[0];
    }
    get previous() {
        const previous = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPrevious)(this.sentence.words, this);
        if (previous) {
            return previous;
        }
        else {
            const words = this.sentence.previous.words;
            return words[words.length - 1];
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session */ "./src/scripts/session.ts");


new _session__WEBPACK_IMPORTED_MODULE_0__["default"]();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map