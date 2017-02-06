(function (Tone) {

	'use strict';

	function Telephone(context) {
		Tone.call(this, context);

		this.lfOsc = null;
		this.hfOsc = null;

		this.gain = null;

		this.filter = null;
	}

	Telephone.prototype.setup = function () {
		this.lfOsc = this.context.createOscillator();
		this.lfOsc.frequency.value = 350;

		this.hfOsc = this.context.createOscillator();
		this.hfOsc.frequency.value = 440;
		this.hfOsc.connect(this.context);

		this.gain = this.context.createGain();
		this.gain.gain.value = 0.25;

		this.filter = this.context.createBiquadFilter();
		this.filter.type = "lowpass";
		this.filter.frequency = 8000;

		this.lfOsc.connect(this.gain);
		this.lfOsc.connect(this.gain);

		this.gain.connect(this.filter);

		this.filter.connect(this.context.destination);
	};

	Telephone.prototype.start = function () {
		this.setup();

		this.lfOsc.start(0);
		this.hfOsc.start(0);

		Tone.prototype.start.call(this);
	};

	Telephone.prototype.stop = function () {
		this.lfOsc.stop(0);
		this.hfOsc.stop(0);

		Tone.prototype.stop.call(this);
	};

	Telephone.prototype = new Tone();
	Telephone.prototype.constructor = Telephone;

	chirps.Telephone = Telephone;

})(window.chirps.Tone);