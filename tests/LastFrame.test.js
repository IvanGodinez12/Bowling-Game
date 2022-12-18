const { describe, expect, it } = require('@jest/globals');
const LastFrame = require('../src/classes/LastFrame.js');

describe('LastFrame', () => {
	const lastFrame = new LastFrame({ number: 10 });
	it('should contain the corresponding data types', () => {
		expect(lastFrame).toEqual(
			expect.objectContaining({
				knockedDownPins: {
					firstThrow: expect.any(Array),
					secondThrow: expect.any(Array),
					thirdThrow: expect.any(Array),
				},
				number: expect.any(Number),
				standingPins: expect.any(Array),
			})
		);
	});
	it('should have a firstThrowScore of 0', () => {
		expect(lastFrame.firstThrowScore).toBe(0);
	});
	it('should have a frameScore of 0', () => {
		expect(lastFrame.frameScore).toBe(0);
	});
	it('should not have any spares', () => {
		expect(lastFrame.spares).toEqual(expect.objectContaining({ firstPairThrows: false, secondPairThrows: false }));
	});
	it('should have a roundScore of 0', () => {
		expect(lastFrame.roundScore).toBe(0);
	});
	it('should have a secondThrowScore of 0', () => {
		expect(lastFrame.secondThrowScore).toBe(0);
	});
	it('should not have any strikes', () => {
		expect(lastFrame.strikes).toEqual(
			expect.objectContaining({
				firstThrow: false,
				secondThrow: false,
				thirdThrow: false,
			})
		);
	});
	it('should have a thirdThrowScore of 0', () => {
		expect(lastFrame.thirdThrowScore).toBe(0);
	});
});
