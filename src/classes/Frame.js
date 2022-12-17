module.exports = class Frame {
	constructor() {
		this.frameScore = 0;
		this.currentScore = 0;
		this.knockedDownPins = {
			first: [],
			second: [],
		};
	}
	get spare() {
		if (this.knockedDownPins.first.length + this.knockedDownPins.second.length == 10) {
			return true;
		} else {
			return false;
		}
	}
	get strike() {
		if (this.knockedDownPins.first.length == 10) {
			return true;
		} else {
			return false;
		}
	}
};
