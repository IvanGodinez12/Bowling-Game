const Game = require('./classes/Game.js');

(async () => {
	const game = new Game();
	await game.start();
})();
