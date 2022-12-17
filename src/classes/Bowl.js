module.exports = class Bowl {
	constructor() {
		this.throwPower = 0;
	}

	throw() {
		this.throwPower = Math.floor(Math.random() * 100) + 1;
	}
};
