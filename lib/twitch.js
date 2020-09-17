const keys = require('../keys.json');
const twitch_client = require('twitch');

const client = twitch_client.withCredentials(keys.twitch_client_id, keys.twitch_client_secret);


module.exports = {

	call: (command, body) => {
		console.log(command);
		console.log(body);
		const game = client.helix.games.getGameByName(body.game_title);
		console.log(game);
	},


};
