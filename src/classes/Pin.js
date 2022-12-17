module.exports = class Pin {
	constructor({ number }) {
		this.standing = true;
		this.number = number;
	}

	knockDown() {
		this.standing = false;
	}
};
