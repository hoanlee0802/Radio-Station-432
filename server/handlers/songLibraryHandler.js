const { isDemoMode } = require("./dataConnector");

const handleAllSongs = (app, Song) => {
	// returns JSON to be used in resp.json() parameter
	return new Promise((resolve, reject) => {
		Song.find()
			.then(data => {
				// console.log(JSON.stringify(data));
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				let demoSongs = [];
				if (isDemoMode()) demoSongs = require('../songs.json');
					
				console.error('Unable to connect to Song Library: \n', err);

				resolve(JSON.stringify(demoSongs));
				// return { message: "Unable to connect to Song Library" }
			})
	})
}

module.exports = { 
	handleAllSongs 
}