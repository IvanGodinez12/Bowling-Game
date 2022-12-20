export interface ILastFrameConstructor {
	number?: number;
}

export interface ILastFrameStrikesReturn {
	firstThrow: boolean;
	secondThrow: boolean;
	thirdThrow: boolean;
}

export interface ILastFrameSparesReturn {
	firstPairThrows: boolean;
	secondPairThrows: boolean;
}
