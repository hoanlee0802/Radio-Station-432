const handleAllSongs = (app, Song) => {
	// returns JSON to be used in resp.json() parameter
	Song.find()
		.then(data => {
			console.log(JSON.stringify(data));
			return JSON.stringify(data);
		})
		.catch(err => {
			return { message: "Unable to connect to Song Library" }
		})
}

module.exports = { 
	handleAllSongs 
}