module.exports = class Bowl {
	constructor() {
		this.precision = 0;
	}

	throw() {
		this.precision = Math.floor(Math.random() * 100) + 1;
	}
};
