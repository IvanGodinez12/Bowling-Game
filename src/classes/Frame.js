module.exports = class Frame {
	constructor({ number }) {
		this.bonusPoints = 0;
		this.knockedDownPins = {
			firstThrow: [],
			secondThrow: [],
		};
		this.number = number;
		this.standingPins = [];
		this.totalScore = 0;
	}

	get firstThrowScore() {
		return this.knockedDownPins.firstThrow.length;
	}

	get frameScore() {
		return this.roundScore + this.bonusPoints;
	}

	get spare() {
		if (this.strike) return false;
		else if (this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length == 10) return true;
		else return false;
	}

	get roundScore() {
		return this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length;
	}

	get secondThrowScore() {
		return this.knockedDownPins.secondThrow.length;
	}

	get strike() {
		if (this.knockedDownPins.firstThrow.length == 10) return true;
		else return false;
	}
};
