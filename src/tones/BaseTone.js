/**
 * Represents the different states of a tone.
 * @enum {number}
 */
const ToneState = {
  NotPlaying: 0,
  Playing: 1,
  Destroyed: 2
};

/**
 * Represents the base class for all tones.
 * @class
 */
class BaseTone {

  /**
   * Web Api Audio Context.
   * @type {AudioContext}
   * @protected
   */
  _context = null;

  /**
   * Volume of the tone.
   * @type {number}
   * @protected
   */
  _volume = 1.0;

  /**
   * The duration of the tone.
   * @type {number}
   * @protected
   */
  _duration = 0;

  /**
   * Whether the sound plays continuously or not.
   * @type {boolean}
   * @protected
   */
  _continuous = false;

  /**
   * Represents the current state of the tone.
   * @type {ToneState}
   * @protected
   */
  _state = ToneState.NotPlaying;

  /**
   * The master gain node of the tone.
   * @type {GainNode}
   * @protected
   */
  _masterGain = null;

  constructor(context, options = {}) {
    this._context = context;

    if (typeof options.volume === 'number' && options.volume >= 0 && options.volume <= 1.0) {
      this._volume = options.volume;
    }
  }

  /**
   * Creates the oscillators, filters and other components required to produce the sound.
   * @protected
   */
  _setup() {
    this._masterGain = this._context.createGain();
    this._masterGain.gain.value = this._volume;
    this._masterGain.connect(this._context.destination);
  }

  _canPlay() {
    return this._state === ToneState.NotPlaying && this._state !== ToneState.Destroyed;
  }

  /**
   * Plays the sound.
   */
  play() {
    if (!this._canPlay()) {
      return this;
    }

    this._play();
    this._state = ToneState.Playing;
  }

  _play() {
    return undefined;
  }

  /**
   * Stops the playing sound.
   */
  stop() {
    if (this._state !== ToneState.Playing) {
      return this;
    }

    this._stop();
    this._state = ToneState.NotPlaying;
  }

  _stop() {
    return undefined;
  }

  /**
   * Destroys the sound.
   */
  destroy() {
    this._masterGain = null;
    this._destroy();
    this._state = ToneState.Destroyed;
  }

  _destroy() {
    return undefined;
  }

  state() {
    return this._state;
  }

  duration() {
    return this._duration;
  }
}

export {ToneState, BaseTone as default};
