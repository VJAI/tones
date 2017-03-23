import {ToneState} from './src/tones/BaseTone';
import TelephoneTone from './src/tones/notification/TelephoneTone';

class TonesTester {

  _context = null;

  _tones = null;

  init() {
    this._context = new AudioContext();

    this._tones = {
      Action: {
        Click: null
      },
      Notification: {
        Alarm1: null,
        Alarm2: null,
        Telephone: new TelephoneTone(this._context)
      },
      Process: {
        Busy: null
      }
    };

    return this;
  }

  render(el) {
    const soundsUl = document.createElement('ul');

    Object.keys(this._tones).forEach(category => {
      const categoryLi = document.createElement('li');
      const categoryTitle = document.createElement('h3');
      categoryTitle.innerText = category;
      categoryLi.appendChild(categoryTitle);

      const tonesUl = document.createElement('ul');
      categoryLi.appendChild(tonesUl);

      Object.keys(this._tones[category]).forEach(toneName => {
        const toneLi = document.createElement('li');
        toneLi.innerHTML = `<div>
                              <span>${toneName}</span>
                              <button class="playstop">play</button>
                            </div>`;
        tonesUl.appendChild(toneLi);
        const playStop = toneLi.querySelector('.playstop');
        toneLi.querySelector('.playstop').addEventListener('click', () => {
          const tone = this._tones[category][toneName];

          if(tone.state() === ToneState.NotReady) {
            tone.setup();
          }

          if(tone.state() === ToneState.Ready) {
            tone.play();
            playStop.innerText = 'stop';
          }
          else {
            tone.stop();
            playStop.innerText = 'play';
          }
        });
      });

      soundsUl.appendChild(categoryLi);
    });

    el.appendChild(soundsUl);
  }
}

window.addEventListener('load', () => {
  new TonesTester().init().render(document.querySelector('.sounds'));
});
