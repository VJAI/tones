import BaseTone from '../BaseTone';

/**
 * Creates a telephone sound.
 * Credit: http://outputchannel.com/post/recreating-phone-sounds-web-audio/
 */
class TelephoneTone extends BaseTone {

  /**
   * Low frequency oscillator.
   * @type {OscillatorNode}
   * @private
   */
  _lfOsc = null;

  /**
   * High frequency oscillator.
   * @type {OscillatorNode}
   * @private
   */
  _hfOsc = null;

  /**
   * Internal gain node.
   * @type {GainNode}
   * @private
   */
  _gain = null;

  /**
   * Low-pass filter.
   * @type {FilterNode}
   * @private
   */
  _filter = null;

  constructor(context) {
    super(context);

    this._continuous = true;
    this._duration = Infinity;
  }

  _setup() {
    super._setup();

    this._lfOsc = this._context.createOscillator();
    this._lfOsc.frequency.value = 350;

    this._hfOsc = this._context.createOscillator();
    this._hfOsc.frequency.value = 440;

    this._gain = this._context.createGain();
    this._gain.gain.value = 0.25;

    this._filter = this._context.createBiquadFilter();
    this._filter.type = "lowpass";
    this._filter.frequency.value = 8000;

    this._lfOsc.connect(this._gain);
    this._hfOsc.connect(this._gain);
    this._gain.connect(this._filter);
    this._filter.connect(this._masterGain);
  }

  _play() {
    this._lfOsc.start(0);
    this._hfOsc.start(0);
  }

  _stop() {
    this._lfOsc.stop(0);
    this._hfOsc.stop(0);
  }

  _destroy() {
    [this._filter, this._gain, this._hfOsc, this._lfOsc].forEach(node => node.disconnect());
    this._filter = null;
    this._gain = null;
    this._lfOsc = null;
    this._hfOsc = null;
  }
}

export default TelephoneTone;
