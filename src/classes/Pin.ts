import { IPinConstructor } from '../interfaces/Pin.js';

export default class Pin {
	public standing: boolean;
	public number: number;

	constructor({ number }: IPinConstructor) {
		this.standing = true;
		this.number = number;
	}

	knockDown(): void {
		this.standing = false;
	}
}
