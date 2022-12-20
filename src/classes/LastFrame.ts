import Pin from './Pin';
import { ILastFrameConstructor, ILastFrameStrikesReturn, ILastFrameSparesReturn } from '../interfaces/LastFrame.js';

export default class LastFrame {
	public knockedDownPins: {
		firstThrow: Array<Pin>;
		secondThrow: Array<Pin>;
		thirdThrow: Array<Pin>;
	};
	public number: number;
	public standingPins: Array<Pin>;
	public totalScore: number;

	constructor({ number }: ILastFrameConstructor) {
		this.knockedDownPins = {
			firstThrow: [],
			secondThrow: [],
			thirdThrow: [],
		};
		this.number = number || 10;
		this.standingPins = [];
		this.totalScore = 0;
	}

	get firstThrowScore(): number {
		return this.knockedDownPins.firstThrow.length;
	}

	get frameScore(): number {
		return this.roundScore;
	}

	get spares(): ILastFrameSparesReturn {
		return {
			firstPairThrows: this.strikes.firstThrow
				? false
				: this.knockedDownPins.firstThrow.length + this.knockedDownPins.secondThrow.length == 10,
			secondPairThrows: this.strikes.secondThrow
				? false
				: this.knockedDownPins.secondThrow.length + this.knockedDownPins.thirdThrow.length == 10,
		};
	}

	get roundScore(): number {
		return (
			this.knockedDownPins.firstThrow.length +
			this.knockedDownPins.secondThrow.length +
			this.knockedDownPins.thirdThrow.length
		);
	}

	get secondThrowScore(): number {
		return this.knockedDownPins.secondThrow.length;
	}

	get strikes(): ILastFrameStrikesReturn {
		return {
			firstThrow: this.knockedDownPins.firstThrow.length == 10,
			secondThrow: this.knockedDownPins.secondThrow.length == 10,
			thirdThrow: this.knockedDownPins.thirdThrow.length == 10,
		};
	}

	get thirdThrowScore(): number {
		return this.knockedDownPins.thirdThrow.length;
	}
}
