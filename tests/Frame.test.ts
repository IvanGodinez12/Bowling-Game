import { describe, expect, it } from '@jest/globals';
import Frame from '../src/classes/Frame.js';

describe('Frame', () => {
	const frame = new Frame({ number: 1 });
	it('should contain the corresponding data types', () => {
		expect(frame).toEqual(
			expect.objectContaining({
				bonusPoints: expect.any(Number),
				knockedDownPins: {
					firstThrow: expect.any(Array),
					secondThrow: expect.any(Array),
				},
				number: expect.any(Number),
				standingPins: expect.any(Array),
			})
		);
	});
	it('should have a firstThrowScore of 0', () => {
		expect(frame.firstThrowScore).toBe(0);
	});
	it('should have a frameScore of 0', () => {
		expect(frame.frameScore).toBe(0);
	});
	it('should not be a spare', () => {
		expect(frame.spare).toBe(false);
	});
	it('should have a roundScore of 0', () => {
		expect(frame.roundScore).toBe(0);
	});
	it('should have a secondThrowScore of 0', () => {
		expect(frame.secondThrowScore).toBe(0);
	});
	it('should not be a strike', () => {
		expect(frame.strike).toBe(false);
	});
});
