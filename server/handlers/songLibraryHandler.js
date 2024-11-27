const handleAllSongs = (app, Song) => {
	// returns JSON to be used in resp.json() parameter
	return new Promise((resolve, reject) => {
		Song.find()
			.then(data => {
				// console.log(JSON.stringify(data));
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				reject(new Error('Unable to connect to Song Library'));
				// return { message: "Unable to connect to Song Library" }
			})
	})
}

module.exports = { 
	handleAllSongs 
}