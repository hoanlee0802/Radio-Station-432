const handleAllUsers = (app, User) => {
	// returns JSON to be used in resp.json() parameter
	return new Promise((resolve, reject) => {
		User.find()
			.then(data => {
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				console.error("Unable to connect to retrieve Users: \n", err);
				resolve(JSON.stringify([]));
			})
	})
}

const handleSingleUser = (app, User, id) => {
	return new Promise((resolve, reject) => {
		User.findOne({ "_id": id })
			.then(data => {
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				console.error("Unable to connect to retrieve User: \n", err);
				resolve(JSON.stringify({}));
			})
	})
}

module.exports = {
	handleAllUsers, 
	handleSingleUser
}