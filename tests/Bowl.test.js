const { describe, expect, it } = require('@jest/globals');
const Bowl = require('../src/classes/Bowl.js');

describe('Bowl', () => {
	const bowl = new Bowl();
	it('should contain the corresponding data types', () => {
		expect(bowl).toEqual(
			expect.objectContaining({
				precision: expect.any(Number),
			})
		);
	});
	it('should get a random number in the precision once throw', () => {
		while (bowl.precision === 0) {
			bowl.throw();
		}
		expect(bowl).toEqual(
			expect.objectContaining({
				precision: expect.any(Number),
			})
		);
	});
});
