module.exports = class LastFrame {
	constructor({ number }) {
		this.knockedDownPins = {
			firstThrow: [],
			secondThrow: [],
			thirdThrow: [],
		};
		this.number = number || 10;
		this.standingPins = [];
		this.totalScore = 0;
	}

	get firstThrowScore() {
		return this.knockedDownPins.firstThrow.length;
	}

	get frameScore() {
		return this.roundScore;
	}

	get spares() {
		return {
			firstPairThrows: this.strikes.first
				? false
				: this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length == 10,
			secondPairThrows: this.strikes.second
				? false
				: this.knockedDownPins.secondThrow.length + this.knockedDownPins.thirdThrow.length == 10,
		};
	}

	get roundScore() {
		return (
			this.knockedDownPins.firstThrow.length +
			this.knockedDownPins.secondThrow.length +
			this.knockedDownPins.thirdThrow.length
		);
	}

	get secondThrowScore() {
		return this.knockedDownPins.secondThrow.length;
	}

	get strikes() {
		return {
			firstThrow: this.knockedDownPins.firstThrow.length == 10,
			secondThrow: this.knockedDownPins.secondThrow.length == 10,
			thirdThrow: this.knockedDownPins.thirdThrow.length == 10,
		};
	}

	get thirdThrowScore() {
		return this.knockedDownPins.thirdThrow.length;
	}
};
