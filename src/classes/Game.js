const Bowl = require('./Bowl.js');
const Frame = require('./Frame.js');
const Pin = require('./Pin.js');
const LastFrame = require('./LastFrame.js');

module.exports = class Game {
	constructor() {
		this.roundsFrames = [];
		this.pins = [];
	}

	setupPins() {
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
		return;
	}

	launch() {
		let bowl = new Bowl();
		bowl.throw();
		for (let i = 0; i < this.pins.length; i++) {
			if (this.pins[i].standing) {
				if (bowl.precision >= Math.floor(Math.random() * 100) + 1) {
					this.pins[i].knockDown();
				}
			}
		}
		return this.pins;
	}

	round({ number }) {
		let frame = new Frame({ number });
		this.launch();
		if (this.pins.some((pin) => pin.standing == true)) {
			frame.knockedDownPins.firstThrow = this.pins.filter((pin) => pin.standing == false);
			this.pins = this.pins.filter((pin) => pin.standing == true);
			this.launch();
			frame.knockedDownPins.secondThrow = this.pins.filter((pin) => pin.standing == false);
			frame.standingPins = this.pins.filter((pin) => pin.standing == true);
			this.pins = this.pins.filter((pin) => pin.standing == true);
		} else {
			frame.knockedDownPins.firstThrow = this.pins.filter((pin) => pin.standing == false);
			frame.standingPins = this.pins.filter((pin) => pin.standing == true);
			this.pins = this.pins.filter((pin) => pin.standing == true);
		}
		return frame;
	}

	lastRound({ number }) {
		let lastFrame = new LastFrame({ number });
		let possibleThrows = ['firstThrow', 'secondThrow', 'thirdThrow'];
		for (let throwTurn of possibleThrows) {
			this.launch();
			lastFrame.knockedDownPins[throwTurn] = this.pins.filter((pin) => pin.standing == false);
			this.pins = this.pins.filter((pin) => pin.standing == true);
			if (lastFrame.strikes[throwTurn]) {
				if (possibleThrows[possibleThrows.indexOf(throwTurn)] != 'thirdThrow') this.setupPins();
			} else if (possibleThrows[possibleThrows.indexOf(throwTurn)] == 'secondThrow') {
				if (lastFrame.spares['firstPairThrows']) this.setupPins();
				else break;
			}
		}
		return lastFrame;
	}

	calculate() {
		for (let i = 1; i <= 10; i++) {
			this.setupPins();
			let roundFrame = i < 10 ? this.round({ number: i }) : this.lastRound({ number: i });
			this.roundsFrames.push(roundFrame);
		}

		for (let [i, roundFrame] of this.roundsFrames.entries()) {
			if (i < 8) {
				if (roundFrame.strike) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
					roundFrame.bonusPoints += this.roundsFrames[i + 1].strike
						? this.roundsFrames[i + 2].firstThrowScore
						: this.roundsFrames[i + 1].secondThrowScore;
				} else if (roundFrame.spare) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
				}
				if (this.roundsFrames[i - 1]) {
					roundFrame.totalScore += this.roundsFrames[i - 1].totalScore;
				}
				roundFrame.totalScore += roundFrame.frameScore;
			} else if (i == 8) {
				if (roundFrame.strike) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
					roundFrame.bonusPoints += this.roundsFrames[i + 1].secondThrowScore;
				} else if (roundFrame.spare) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
				}
				if (this.roundsFrames[i - 1]) {
					roundFrame.totalScore += this.roundsFrames[i - 1].totalScore;
				}
				roundFrame.totalScore += roundFrame.frameScore;
			} else if (i == 9) {
				if (this.roundsFrames[i - 1]) {
					roundFrame.totalScore += this.roundsFrames[i - 1].totalScore;
				}
				roundFrame.totalScore += roundFrame.frameScore;
			}
		}
		return this.roundsFrames;
	}

	print() {
		let string = {
			top: '|',
			middle: '|',
			bottom: '|',
		};
		for (let roundFrame of this.roundsFrames) {
			string.top += ` ${roundFrame.number} |`;
			string.middle += ` ${roundFrame.knockedDownPins.firstThrow.length} - ${roundFrame.knockedDownPins.secondThrow.length} |`;
			string.bottom += ` ${roundFrame.totalScore} |`;
		}
		console.log(string.top);
		console.log(string.middle);
		console.log(string.bottom);
	}

	start({ print } = { print: true }) {
		this.calculate();
		if (print) this.print();
		return this.roundsFrames;
	}
};
