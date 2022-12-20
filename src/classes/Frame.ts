import Pin from './Pin.js';
import { IFrameConstructor } from '../interfaces/Frame.js';

export default class Frame {
	public bonusPoints: number;
	public knockedDownPins: {
		firstThrow: Array<Pin>;
		secondThrow: Array<Pin>;
	};
	public number: number;
	public standingPins: Array<Pin>;
	public totalScore: number;

	constructor({ number }: IFrameConstructor) {
		this.bonusPoints = 0;
		this.knockedDownPins = {
			firstThrow: [],
			secondThrow: [],
		};
		this.number = number;
		this.standingPins = [];
		this.totalScore = 0;
	}

	get firstThrowScore(): number {
		return this.knockedDownPins.firstThrow.length;
	}

	get frameScore(): number {
		return this.roundScore + this.bonusPoints;
	}

	get spare(): boolean {
		if (this.strike) return false;
		else if (this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length == 10) return true;
		else return false;
	}

	get roundScore(): number {
		return this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length;
	}

	get secondThrowScore(): number {
		return this.knockedDownPins.secondThrow.length;
	}

	get strike(): boolean {
		if (this.knockedDownPins.firstThrow.length == 10) return true;
		else return false;
	}
}
