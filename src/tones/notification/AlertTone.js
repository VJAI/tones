import BaseTone from '../BaseTone';

/**
 * Creates an alert tone.
 * Credit: https://code.tutsplus.com/tutorials/the-web-audio-api-adding-sound-to-your-web-app--cms-23790
 * More to look: https://www.sitepoint.com/web-audio-api-add-sound-to-web-page/
 * http://www.flightarcade.com/learn/webaudio
 * http://outputchannel.com/post/night-vision-sound-in-web-audio/
 * http://outputchannel.com/post/quindar-tones-in-web-audio/
 */
class AlertTone extends BaseTone {

  _osc1 = null;

  _osc2 = null;

  _gain = null;

  constructor(context) {
    super(context);
    this._duration = 2;
  }

  _setup() {
    this._osc1 = this._context.createOscillator();
    this._osc1.type = 'triangle';

    this._osc2 = this._context.createOscillator();
    this._osc2.type = 'triangle';

    this._gain = this._context.createGain();
    this._gain.gain.value = 0.1;

    this._osc1.connect(this._gain);
    this._osc2.connect(this._gain);


  }

  _playTone() {

  }

  _play() {
    const startTime = this._context.currentTime;

    this._osc1.start(startTime);
    this._osc2.start(startTime);

    this._osc1.stop(startTime, this._duration);
    this._osc2.stop(startTime, this._duration);
  }

  _stop() {

  }

  _destroy() {

  }
}
