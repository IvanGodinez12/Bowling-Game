const { describe, expect, it } = require('@jest/globals');
const Game = require('../src/classes/Game.js');

describe('LastFrame', () => {
	const game = new Game();
	it('should contain the corresponding data types', () => {
		expect(game).toEqual(
			expect.objectContaining({
				roundsFrames: expect.any(Array),
				pins: expect.any(Array),
			})
		);
	});
	it('should return all the rounds frames scores and info', async () => {
		await game.start({ print: false });
		expect(game.roundsFrames).toEqual(expect.any(Array));
	});
	it('should contain the total score of the fame', () => {
		expect(game.finalScore).toEqual(expect.any(Number));
	});
});
