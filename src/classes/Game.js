const Table = require('cli-table');
const Bowl = require('./Bowl.js');
const Frame = require('./Frame.js');
const Pin = require('./Pin.js');
const LastFrame = require('./LastFrame.js');

module.exports = class Game {
	constructor() {
		this.finalScore = 0;
		this.rounds = 10;
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
		const bowl = new Bowl();
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
		const frame = new Frame({ number });
		this.launch();
		if (this.pins.some((pin) => pin.standing === true)) {
			frame.knockedDownPins.firstThrow = this.pins.filter((pin) => pin.standing === false);
			this.pins = this.pins.filter((pin) => pin.standing === true);
			this.launch();
			frame.knockedDownPins.secondThrow = this.pins.filter((pin) => pin.standing === false);
			frame.standingPins = this.pins.filter((pin) => pin.standing === true);
			this.pins = this.pins.filter((pin) => pin.standing === true);
		} else {
			frame.knockedDownPins.firstThrow = this.pins.filter((pin) => pin.standing === false);
			frame.standingPins = this.pins.filter((pin) => pin.standing === true);
			this.pins = this.pins.filter((pin) => pin.standing === true);
		}
		return frame;
	}

	lastRound({ number }) {
		const lastFrame = new LastFrame({ number });
		const possibleThrows = ['firstThrow', 'secondThrow', 'thirdThrow'];
		for (const throwTurn of possibleThrows) {
			this.launch();
			lastFrame.knockedDownPins[throwTurn] = this.pins.filter((pin) => pin.standing === false);
			this.pins = this.pins.filter((pin) => pin.standing === true);
			if (lastFrame.strikes[throwTurn]) {
				if (possibleThrows[possibleThrows.indexOf(throwTurn)] != 'thirdThrow') this.setupPins();
			} else if (possibleThrows[possibleThrows.indexOf(throwTurn)] == 'secondThrow') {
				if (lastFrame.spares.firstPairThrows) this.setupPins();
				else break;
			}
		}
		return lastFrame;
	}

	calculate() {
		for (let i = 1; i <= 10; i++) {
			this.setupPins();
			const roundFrame = i < 10 ? this.round({ number: i }) : this.lastRound({ number: i });
			this.roundsFrames.push(roundFrame);
		}
		for (const [i, roundFrame] of this.roundsFrames.entries()) {
			if (i < 8 && roundFrame instanceof Frame) {
				if (roundFrame.strike) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
					const nextFrame = this.roundsFrames[i + 1];
					if (nextFrame instanceof Frame) {
						roundFrame.bonusPoints += nextFrame.strike
							? this.roundsFrames[i + 2].firstThrowScore
							: this.roundsFrames[i + 1].secondThrowScore;
					}
				} else if (roundFrame.spare) {
					roundFrame.bonusPoints += this.roundsFrames[i + 1].firstThrowScore;
				}
				if (this.roundsFrames[i - 1]) {
					roundFrame.totalScore += this.roundsFrames[i - 1].totalScore;
				}
				roundFrame.totalScore += roundFrame.frameScore;
			} else if (i == 8 && roundFrame instanceof Frame) {
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
			} else if (i == 9 && roundFrame instanceof LastFrame) {
				if (this.roundsFrames[i - 1]) {
					roundFrame.totalScore += this.roundsFrames[i - 1].totalScore;
				}
				roundFrame.totalScore += roundFrame.frameScore;
			}
		}
		return this.roundsFrames;
	}

	print() {
		const table = new Table({
			chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
			colAligns: ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
			head: this.roundsFrames.map((roundFrame) => roundFrame.number.toString()),
		});
		table.push(
			this.roundsFrames.map(
				(roundFrame) =>
					`${roundFrame.firstThrowScore} | ${roundFrame.secondThrowScore}${
						roundFrame instanceof LastFrame && roundFrame.thirdThrowScore >= 0 ? ` | ${roundFrame.thirdThrowScore}` : ''
					}`
			),
			this.roundsFrames.map((roundFrame) => roundFrame.totalScore.toString())
		);
		console.info('Bowling game results');
		console.log(table.toString());
	}

	start({ print } = { print: true }) {
		this.calculate();
		this.finalScore = this.roundsFrames[this.roundsFrames.length - 1].totalScore;
		if (print) this.print();
		return this.roundsFrames;
	}
};
