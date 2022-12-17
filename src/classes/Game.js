const Bowl = require('./Bowl.js');
const Frame = require('./Frame.js');
const Pin = require('./Pin.js');

module.exports = class Game {
	constructor() {
		this.pins = [
			new Pin({ number: 1 }),
			new Pin({ number: 2 }),
			new Pin({ number: 3 }),
			new Pin({ number: 4 }),
			new Pin({ number: 5 }),
			new Pin({ number: 6 }),
			new Pin({ number: 7 }),
			new Pin({ number: 8 }),
			new Pin({ number: 9 }),
			new Pin({ number: 10 }),
		];
	}

	launch() {
		let bowl = new Bowl();
		bowl.throw();
		for (let i = 0; i < this.pins.length; i++) {
			if (this.pins[i].standing) {
				if (bowl.throwPower > Math.floor(Math.random() * 100) + 1) {
					this.pins[i].knockDown();
				}
			}
		}
		for (let pin of this.pins) {
			if (!pin.standing) {
				let pinIndex = this.pins.indexOf(pin);
				this.pins.splice(pinIndex, 1);
			}
		}
		// for (let i = 0; i <= this.pins.length; i++) {
		// 	if (!this.pins[i].standing) {
		// 		this.pins.splice(i, 1);
		// 		i--;
		// 	}
		// }
		return this.pins;
	}

	round() {
		// Extender a 12 lanzamientos si el tiro en el lanzamiento 10 es un strike o un spare
		for (let i = 0; i <= 11; i++) {
			let frame = new Frame();
			this.launch();
			if (this.pins.some((pin) => pin.standing == true)) {
				frame.knockedDownPins.first = this.pins.filter((pin) => pin.standing == false);
				this.launch();
				frame.knockedDownPins.second = this.pins.filter((pin) => pin.standing == false);
			} else {
				frame.knockedDownPins.first = this.pins.filter((pin) => pin.standing == false);
			}
			return { frame, pins: this.pins };
		}
	}

	start() {
		this.round();
	}
};
