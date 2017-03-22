const ToneState = {
  NotReady: 0,
  Ready: 1,
  Playing: 2,
  Destroyed: 3
};

/**
 * Represents the base class for all tones.
 * @class
 */
class BaseTone {

	_context = null;

	constructor(context) {
		this._context = context;
	}

	setup() {

	}

	play() {

	}

	stop() {

	}
}

export {ToneState, BaseTone as default};
