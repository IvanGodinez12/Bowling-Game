import { describe, expect, it } from '@jest/globals';
import Pin from '../src/classes/Pin.js';

describe('Pin', () => {
	const pin = new Pin({ number: 1 });
	it('should contain the corresponding data types', () => {
		expect(pin).toEqual(
			expect.objectContaining({
				standing: expect.any(Boolean),
				number: expect.any(Number),
			})
		);
	});
	it('should not be standing once knock down', () => {
		pin.knockDown();
		expect(pin).toEqual(
			expect.objectContaining({
				standing: false,
				number: 1,
			})
		);
	});
});
