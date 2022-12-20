export default class Bowl {
	public precision: number;

	constructor() {
		this.precision = 0;
	}

	throw(): void {
		this.precision = Math.floor(Math.random() * 100) + 1;
	}
}
