import BaseTone, {ToneState} from '../BaseTone';

class TelephoneTone extends BaseTone {

  _lfOsc = null;

  _hfOsc = null;

  _gain = null;

  _filter = null;

	setup() {
		this._lfOsc = this._context.createOscillator();
		this._lfOsc.frequency.value = 350;

		this._hfOsc = this._context.createOscillator();
		this._hfOsc.frequency.value = 440;
		this._hfOsc.connect(this._context);

		this._gain = this._context.createGain();
		this._gain.gain.value = 0.25;

		this._filter = this._context.createBiquadFilter();
		this._filter.type = "lowpass";
		this._filter.frequency = 8000;

		this._lfOsc.connect(this._gain);
		this._lfOsc.connect(this._gain);

		this._gain.connect(this._filter);

		this._filter.connect(this._context.destination);

    this._state = ToneState.Ready;
	}

	play() {
	  if(this._state === ToneState.Playing || this._state === ToneState.Destroyed) {
	    return this;
    }

    if(this._state === ToneState.NotReady) {
      this.setup();
    }

		this._lfOsc.start(0);
		this._hfOsc.start(0);
	}

	stop() {
	  if(this._state !== ToneState.Playing) {
	    return this;
    }

		this._lfOsc.stop(0);
		this._hfOsc.stop(0);
	}

	destroy() {

	}
}

export default TelephoneTone;
